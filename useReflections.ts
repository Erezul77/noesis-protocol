
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ReflectionVaultABI from '@/lib/ReflectionVaultABI.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_REFLECTION_VAULT_CONTRACT as string;
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

export type Reflection = {
  cid: string;
  submitter: string;
  timestamp: number;
  adequacy: number;
  joy: number;
  knowledgeType: 'K1' | 'K2' | 'K3';
  clarityScore: number;
};

export default function useReflections(): Reflection[] {
  const [reflections, setReflections] = useState<Reflection[]>([]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ReflectionVaultABI, provider);

    async function fetchEvents() {
      const filter = contract.filters.ReflectionSubmitted();
      const events = await contract.queryFilter(filter, -10000);

      const parsed = await Promise.all(events.map(async (event: any) => {
        const { submitter, cid, timestamp, adequacyScore } = event.args;
        const adequacy = Number(adequacyScore);
        const joy = Math.floor(Math.random() * 30); // mock ΔA for now

        // Mock fetch reflection content from IPFS (replace with actual fetch if needed)
        const content = 'This is a placeholder reflection content from IPFS.';

        const reflection: Reflection = {
          cid,
          submitter,
          timestamp: Number(timestamp),
          adequacy,
          joy,
          knowledgeType: classifyKnowledgeType({ cid, adequacy, joy, content } as any),
          clarityScore: calculateClarity({ adequacy, joy }),
        };

        return reflection;
      }));

      setReflections(parsed.reverse());
    }

    fetchEvents();
  }, []);

  function classifyKnowledgeType(reflection: { adequacy: number; joy: number; content: string }): 'K1' | 'K2' | 'K3' {
    const { adequacy, joy, content } = reflection;

    const hasCausalStructure = /because|therefore|follows from|as a result/i.test(content);
    const hasCommonNotions = /motion|order|structure|nature|pattern/i.test(content);

    if (adequacy > 80 && joy > 20 && hasCausalStructure) return 'K3';
    if (adequacy > 50 && hasCommonNotions) return 'K2';
    return 'K1';
  }

  function calculateClarity(reflection: { adequacy: number; joy: number }): number {
    return 0.5 * reflection.adequacy + 0.5 * reflection.joy;
  }

  return reflections;
}
