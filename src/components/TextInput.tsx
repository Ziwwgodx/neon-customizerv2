import React from 'react';
import { motion } from 'framer-motion';
import { Type } from 'lucide-react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Type className="w-5 h-5 text-pink-500" />
        Votre texte
      </div>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Entrez votre texte personnalisé..."
          rows={3}
          maxLength={50}
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {value.length}/50
        </div>
      </div>
      <div className="text-xs text-gray-400">
        💡 Conseil: Les textes courts sont plus impactants pour un néon
      </div>
    </motion.div>
  );
};

export default TextInput;