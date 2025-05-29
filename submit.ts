
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import ReflectionVault from '../artifacts/contracts/ReflectionVault.sol/ReflectionVault.json';

dotenv.config();

const CONTRACT_ADDRESS = process.env.REFLECTION_VAULT_CONTRACT!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ReflectionVault.abi, signer);

function classifyKnowledgeType(content: string, adequacy: number, joy: number): 'K1' | 'K2' | 'K3' {
  const hasCausalStructure = /because|therefore|follows from|as a result/i.test(content);
  const hasCommonNotions = /motion|order|structure|nature|pattern/i.test(content);

  if (adequacy > 80 && joy > 20 && hasCausalStructure) return 'K3';
  if (adequacy > 50 && hasCommonNotions) return 'K2';
  return 'K1';
}

function calculatePsiScore(adequacy: number, joy: number): number {
  return 0.5 * adequacy + 0.5 * joy;
}

async function submitReflection(cid: string, filePath: string, adequacy: number, joy: number) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const knowledgeType = classifyKnowledgeType(content, adequacy, joy);
  const psiScore = calculatePsiScore(adequacy, joy);

  console.log(`📘 Submitting reflection:`);
  console.log(`• CID: ${cid}`);
  console.log(`• Knowledge Type: ${knowledgeType}`);
  console.log(`• ψ-Score: ${psiScore.toFixed(2)}`);

  const tx = await contract.submitReflection(cid, adequacy, joy);
  await tx.wait();
  console.log(`✅ Submitted to contract. TX Hash: ${tx.hash}`);
}

// Usage: ts-node submit.ts <cid> <file> <adequacy> <joy>
const [cid, filePath, aStr, jStr] = process.argv.slice(2);
submitReflection(cid, filePath, parseInt(aStr), parseInt(jStr));
