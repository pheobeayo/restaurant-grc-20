import { Wallet, providers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

export function getWallet() {
  const provider = new providers.JsonRpcProvider(process.env.RPC_URL);
  return new Wallet(process.env.PRIVATE_KEY || '', provider);
}