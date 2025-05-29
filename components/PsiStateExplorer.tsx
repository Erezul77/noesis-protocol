import React from 'react';
import { Reflection } from '../models/Reflection';

interface PsiStateExplorerProps {
  reflections: Reflection[];
}

export const PsiStateExplorer: React.FC<PsiStateExplorerProps> = ({ reflections }) => {
  const thresholdPsi = 0.9;
  const thresholdDeltaP = 0.9;
  const thresholdAa = 1.5;

  const highlighted = reflections.filter(
    (r) => r.psi >= thresholdPsi && r.deltaP >= thresholdDeltaP && r.Aa >= thresholdAa
  );

  return (
    <div className="p-4 border rounded-xl bg-gradient-to-br from-white to-lime-100 shadow">
      <h3 className="text-xl font-bold mb-3">ψ-State Emergence</h3>
      {highlighted.length === 0 ? (
        <p className="text-gray-600">No transcendental states yet. Keep reflecting 💭</p>
      ) : (
        <ul className="list-disc list-inside text-gray-800">
          {highlighted.map((r) => (
            <li key={r.id}>
              <strong>Reflection #{r.id}</strong> → ψ={r.psi.toFixed(2)}, ΔP={r.deltaP.toFixed(2)}, Aₐ={r.Aa.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};