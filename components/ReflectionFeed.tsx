
// components/ReflectionFeed.tsx

'use client';
import { useState } from 'react';
import ReflectionCard from './ReflectionCard';

interface Reflection {
  content: string;
  adequacy: number;
  joy: number;
  cid: string;
}

interface Props {
  reflections: Reflection[];
}

export default function ReflectionFeed({ reflections }: Props) {
  const [psiOnly, setPsiOnly] = useState(false);
  const [sortByPsi, setSortByPsi] = useState(false);

  const visibleReflections = reflections
    .filter(r => !psiOnly || (0.5 * r.adequacy + 0.5 * r.joy >= 80))
    .sort((a, b) =>
      sortByPsi
        ? (0.5 * b.adequacy + 0.5 * b.joy) - (0.5 * a.adequacy + 0.5 * a.joy)
        : 0
    );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={psiOnly} onChange={() => setPsiOnly(!psiOnly)} />
          ψ-state only
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={sortByPsi} onChange={() => setSortByPsi(!sortByPsi)} />
          Sort by ψ-score
        </label>
      </div>
      {visibleReflections.map((r, i) => (
        <ReflectionCard key={i} {...r} />
      ))}
    </div>
  );
}
