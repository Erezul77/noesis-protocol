
import fs from 'fs';
import path from 'path';

type Reflection = {
  cid: string;
  content: string;
  adequacy: number;
  joy: number;
  knowledgeType: 'K1' | 'K2' | 'K3';
  clarityScore: number;
};

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

// Example usage
function analyzeReflection(cid: string, content: string, adequacy: number, joy: number): Reflection {
  const knowledgeType = classifyKnowledgeType({ adequacy, joy, content });
  const clarityScore = calculateClarity({ adequacy, joy });

  return {
    cid,
    content,
    adequacy,
    joy,
    knowledgeType,
    clarityScore,
  };
}

// Sample run
const cid = 'bafybeiexamplecid';
const content = fs.readFileSync(path.join(__dirname, 'sample_reflection.txt'), 'utf-8');
const adequacy = 74;
const joy = 18;

const analyzed = analyzeReflection(cid, content, adequacy, joy);
console.log('Reflection Analysis:', analyzed);
