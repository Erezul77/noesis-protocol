
// submitReflection.ts (Extended for CRM)
// This module handles submitting a reflection with causal logging

import { storeToIPFS } from './ipfs'
import { ethers } from 'ethers'
import { submitToContract } from './contract'

export async function submitReflection({
  text,
  psiScore,
  deltaP,
  userWallet,
}: {
  text: string
  psiScore: number
  deltaP: number
  userWallet: string
}) {
  // 1. Load read reflections from session
  const causal_parents = JSON.parse(sessionStorage.getItem('readReflections') || '[]')

  // 2. Construct payload
  const payload = {
    text,
    timestamp: new Date().toISOString(),
    psi: psiScore,
    deltaP,
    causal_parents,
    author: userWallet,
  }

  // 3. Store to IPFS
  const cid = await storeToIPFS(payload)

  // 4. Submit hash to Ethereum contract
  await submitToContract(cid)
}
