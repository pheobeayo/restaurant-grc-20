import axios from 'axios';

export async function uploadToIPFS(metadata: any): Promise<string> {
  const pinataApiKey = process.env.PINATA_API_KEY;
  const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;

  const response = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    metadata,
    {
      headers: {
        'Content-Type': 'application/json',
        pinata_api_key: pinataApiKey!,
        pinata_secret_api_key: pinataSecretApiKey!,
      },
    }
  );

  return `ipfs://${response.data.IpfsHash}`;
}
