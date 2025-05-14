import 'dotenv/config';
import { createWalletClient, http, parseGwei } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import fs from 'fs-extra';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { grc20Testnet } from './testnet.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PUBLISHED_FILE = path.join(__dirname, '../data/published_fuu.json');
const spaceId = process.env.SPACE_ID;

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

async function publishFu() {
  if (!fs.existsSync(PUBLISHED_FILE)) {
    console.error(`❌ File not found: ${PUBLISHED_FILE}`);
    return;
  }

  let publishedList;
  try {
    const fileContent = await fs.readFile(PUBLISHED_FILE, 'utf-8');
    publishedList = JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Failed to parse published_fuu.json:', error);
    return;
  }

  if (!Array.isArray(publishedList) || publishedList.length === 0) {
    console.log('⚠️ No items found in published_fuu.json');
    return;
  }

  console.log(`🔎 Found ${publishedList.length} items to publish on-chain.`);

  for (const record of publishedList) {
    const { title, ipfsHash } = record;
    if (!ipfsHash) {
      console.warn(`⚠️ Skipping item "${title}" due to missing IPFS hash.`);
      continue;
    }

    const payload = {
      spaceId,
      cid: ipfsHash.startsWith('ipfs://') ? ipfsHash : `ipfs://${ipfsHash}`,
      network: 'TESTNET',
    };

    const apiUrl = `https://api-testnet.grc-20.thegraph.com/space/${spaceId}/edit/calldata`;

    let to: `0x${string}`;
    let data: `0x${string}`;

    try {
      const result = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!result.ok) {
        const errorText = await result.text();
        console.error('❌ API request failed:', errorText);
        continue;
      }

      const responseJson = await result.json();
      to = responseJson.to;
      data = responseJson.data;
    } catch (error) {
      console.error('❌ Failed to get calldata from API:', error);
      continue;
    }

    console.log(`⛽ Preparing transaction for "${title}"...`);
    const gasLimit = BigInt(13000000);
    const baseGasPrice = parseGwei('0.01');

    try {
      const txHash = await walletClient.sendTransaction({
        chain: grc20Testnet,
        to: `0x${to.replace(/^0x/, '')}`,
        data: data.startsWith('0x') ? (data as `0x${string}`) : `0x${data}`,
        gas: gasLimit,
        maxFeePerGas: baseGasPrice,
        maxPriorityFeePerGas: baseGasPrice,
        value: BigInt(0),
      });

      console.log(`[✅] Published "${title}" → TX: ${txHash}`);
    } catch (err) {
      console.error(`❌ Failed to publish "${title}":`, err);
    }
  }

  console.log('\n✅ Done publishing all items!');
}


if (process.argv.includes('--run')) {
  publishFu()
    .then(() => {
      console.log('✅ Done.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ ERROR:', err);
      process.exit(1);
    });
}

export { publishFu };
