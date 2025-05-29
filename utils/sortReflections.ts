import { Reflection } from '../models/Reflection';

interface SortConfig {
  wPsi?: number;
  wDeltaP?: number;
}

export function sortReflections(
  reflections: Reflection[],
  config: SortConfig = { wPsi: 1, wDeltaP: 1 }
): Reflection[] {
  const { wPsi, wDeltaP } = config;

  return reflections
    .map((r) => ({
      ...r,
      A_total: (wPsi ?? 1) * r.psi + (wDeltaP ?? 1) * r.deltaP
    }))
    .sort((a, b) => b.A_total - a.A_total);
}