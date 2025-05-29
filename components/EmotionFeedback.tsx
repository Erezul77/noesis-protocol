import React, { useState } from 'react';

interface EmotionFeedbackProps {
  reflectionId: string;
  onSubmit: (deltaP: number, text: string) => void;
}

export const EmotionFeedback: React.FC<EmotionFeedbackProps> = ({ reflectionId, onSubmit }) => {
  const [deltaP, setDeltaP] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    onSubmit(deltaP, text);
    setDeltaP(0);
    setText('');
  };

  return (
    <div className="p-4 border rounded-xl shadow-md mt-4">
      <h4 className="font-semibold mb-2">How did this reflection affect you?</h4>
      <input
        type="range"
        min="-1"
        max="1"
        step="0.1"
        value={deltaP}
        onChange={(e) => setDeltaP(parseFloat(e.target.value))}
        className="w-full"
      />
      <div className="text-sm text-center mt-1 mb-2">
        {deltaP < -0.5 ? '😡' : deltaP < 0 ? '😕' : deltaP === 0 ? '😐' : deltaP < 0.5 ? '🙂' : '❤️'}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a brief response (optional)"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Response
      </button>
    </div>
  );
};