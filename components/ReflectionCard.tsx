import React, { useState } from 'react';
import { Reflection } from '../models/Reflection';
import { updateReflection } from '../utils/updateReflection';
import { EmotionFeedback } from './EmotionFeedback';

interface ReflectionCardProps {
  reflection: Reflection;
  userId: string;
  onUpdate: (updated: Reflection) => void;
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({ reflection, userId, onUpdate }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleResponse = (deltaP: number, text: string) => {
    const updated = updateReflection(reflection, userId, text, deltaP);
    onUpdate(updated);
    setShowFeedback(false);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md">
      <h3 className="text-xl font-bold mb-2">Reflection</h3>
      <p className="text-gray-800 mb-3">{reflection.content}</p>
      <div className="text-sm text-gray-600 mb-1">
        ψ: {reflection.psi.toFixed(2)} | ΔP: {reflection.deltaP.toFixed(2)} | Aₐ: {reflection.Aa.toFixed(2)}
      </div>
      <button
        onClick={() => setShowFeedback(!showFeedback)}
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        {showFeedback ? 'Cancel' : 'Respond Emotionally'}
      </button>
      {showFeedback && (
        <EmotionFeedback reflectionId={reflection.id} onSubmit={handleResponse} />
      )}
    </div>
  );
};