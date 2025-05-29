
import fs from 'fs';
import path from 'path';

type Reflection = {
  cid: string;
  content: string;
  adequacy: number;
  joy: number;
};

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

const reflectionDir = './reflections';

fs.readdirSync(reflectionDir).forEach(file => {
  const content = fs.readFileSync(path.join(reflectionDir, file), 'utf-8');
  const adequacy = 82;
  const joy = 25;

  const knowledgeType = classifyKnowledgeType(content, adequacy, joy);
  const psiScore = calculatePsiScore(adequacy, joy);

  if (psiScore >= 80) {
    console.log(`ψ-candidate found in: ${file}`);
    console.log(`• Knowledge: ${knowledgeType}`);
    console.log(`• ψ-Score: ${psiScore.toFixed(2)}\n`);
  }
});
