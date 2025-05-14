import 'dotenv/config';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWalletClient, http, parseGwei } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { grc20Testnet } from '../testnet.js';
import type { Restaurant } from '../types/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESTAURANT_FILE = path.join(__dirname, '../data/restaurants.json');

const spaceId = process.env.SPACE_ID;
if (!spaceId) {
  console.error('❌ Missing SPACE_ID in .env');
  process.exit(1);
}

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error('❌ Missing PRIVATE_KEY in .env');
  process.exit(1);
}

const rpcUrl = process.env.RPC_URL || grc20Testnet.rpcUrls.default.http[0];
const account = privateKeyToAccount(`0x${privateKey}`);
const walletClient = createWalletClient({
  account,
  chain: grc20Testnet,
  transport: http(rpcUrl),
});


async function uploadToIPFS(metadata: Record<string, any>): Promise<string> {
  const pinataApiKey = process.env.PINATA_API_KEY!;
  const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY!;

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    metadata,
    {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
}

function buildMetadata(restaurant: Restaurant) {
  return {
    name: restaurant.name || 'Unnamed',
    location: `${restaurant.location.address}`,
    cuisine: restaurant.cuisine || 'Unknown',
    rating: restaurant.rating ?? 'N/A',
    url: restaurant.url || '',
  };
}

export async function publishRestaurants(restaurants: Restaurant[]) {
  if (!fs.existsSync(RESTAURANT_FILE)) {
    console.error('❌ No restaurant data found. Please run the scraper first.');
    return;
  }

  console.log(`📦 Loaded ${restaurants.length} restaurants`);

  for (const restaurant of restaurants) {
    const metadata = buildMetadata(restaurant);

    let ipfsHash: string;
    try {
      ipfsHash = await uploadToIPFS(metadata);
      console.log(`📤 Uploaded to IPFS: ${ipfsHash}`);
    } catch (err) {
      console.error(`❌ Failed to upload metadata for ${metadata.name}:`, err);
      continue;
    }

    const payload = {
      spaceId,
      cid: ipfsHash,
      network: 'TESTNET',
    };

    const apiUrl = `https://api-testnet.grc-20.thegraph.com/space/${spaceId}/edit/calldata`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Calldata API failed: ${errText}`);
      }

      const { to, data }: { to: `0x${string}`; data: string } = await res.json();

      const txHash = await walletClient.sendTransaction({
        chain: grc20Testnet,
        to,
        data: (data.startsWith('0x') ? data : `0x${data}`) as `0x${string}`,
        gas: BigInt(13000000),
        maxFeePerGas: parseGwei('0.01'),
        maxPriorityFeePerGas: parseGwei('0.01'),
        value: BigInt(0),
      });

      console.log(`✅ Published ${metadata.name} → TX: ${txHash}`);
    } catch (err) {
      console.error(`❌ Failed to publish ${metadata.name}:`, err);
    }
  }
}

