
// utils/epistemicScore.ts

export function classifyKnowledgeType(content: string, adequacy: number, joy: number): 'K1' | 'K2' | 'K3' {
  const hasCausalStructure = /because|therefore|follows from|as a result/i.test(content);
  const hasCommonNotions = /motion|order|structure|nature|pattern/i.test(content);

  if (adequacy > 80 && joy > 20 && hasCausalStructure) return 'K3';
  if (adequacy > 50 && hasCommonNotions) return 'K2';
  return 'K1';
}

export function calculatePsiScore(adequacy: number, joy: number): number {
  return 0.5 * adequacy + 0.5 * joy;
}
