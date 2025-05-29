import { Web3Storage } from 'web3.storage';
import { ethers } from 'ethers';
import { Reflection } from '../models/Reflection';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants/contract';

export async function submitReflectionToIPFS(
  reflection: Reflection,
  client: Web3Storage
): Promise<string> {
  const blob = new Blob([JSON.stringify(reflection)], { type: 'application/json' });
  const cid = await client.put([new File([blob], `${reflection.id}.json`)]);
  return `ipfs://${cid}/${reflection.id}.json`;
}

export async function writeReflectionToChain(
  ipfsUrl: string,
  signer: ethers.Signer
) {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const tx = await contract.submitReflection(ipfsUrl);
  await tx.wait();
  return tx.hash;
}