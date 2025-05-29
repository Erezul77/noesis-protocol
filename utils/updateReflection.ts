import { Reflection, Response } from '../models/Reflection';

export function updateReflection(
  reflection: Reflection,
  userId: string,
  text: string,
  deltaP: number
): Reflection {
  const newResponse: Response = {
    userId,
    text,
    deltaP,
    timestamp: Date.now()
  };

  const updatedResponses = [...reflection.responses, newResponse];
  const totalDeltaP = updatedResponses.reduce((sum, r) => sum + r.deltaP, 0);
  const updatedAa = reflection.psi + totalDeltaP;

  return {
    ...reflection,
    responses: updatedResponses,
    deltaP: totalDeltaP,
    Aa: updatedAa
  };
}