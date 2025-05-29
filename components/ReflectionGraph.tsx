import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Reflection } from '../models/Reflection';

interface ReflectionGraphProps {
  reflections: Reflection[];
}

export const ReflectionGraph: React.FC<ReflectionGraphProps> = ({ reflections }) => {
  const data = reflections.map((r, i) => ({
    index: i + 1,
    psi: r.psi,
    deltaP: r.deltaP,
    Aa: r.Aa
  }));

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h3 className="text-lg font-bold mb-4">Clarity & Emotion Graph</h3>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" label={{ value: 'Reflection #', position: 'insideBottomRight', offset: -5 }} />
        <YAxis domain={[0, 'auto']} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="psi" stroke="#8884d8" name="ψ (Clarity)" />
        <Line type="monotone" dataKey="deltaP" stroke="#82ca9d" name="ΔP (Emotion)" />
        <Line type="monotone" dataKey="Aa" stroke="#ff7300" name="Aₐ (Adequacy)" />
      </LineChart>
    </div>
  );
};