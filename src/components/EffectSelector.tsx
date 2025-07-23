import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, Sparkles, Waves } from 'lucide-react';

interface EffectSelectorProps {
  selectedEffect: 'static' | 'blink' | 'gradient' | 'fade';
  onEffectChange: (effect: 'static' | 'blink' | 'gradient' | 'fade') => void;
}

const effects = [
  {
    id: 'static' as const,
    name: 'Statique',
    description: 'Lumière continue',
    icon: Eye,
    preview: '━━━━'
  },
  {
    id: 'blink' as const,
    name: 'Clignotant',
    description: 'Clignotement rythmé',
    icon: Zap,
    preview: '━ ━ ━'
  },
  {
    id: 'gradient' as const,
    name: 'Dégradé',
    description: 'Transition colorée',
    icon: Sparkles,
    preview: '▓▓▒▒░'
  },
  {
    id: 'fade' as const,
    name: 'Fade',
    description: 'Fondu doux',
    icon: Waves,
    preview: '▁▃▅▇▅▃▁'
  }
];

const EffectSelector: React.FC<EffectSelectorProps> = ({ selectedEffect, onEffectChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Sparkles className="w-5 h-5 text-cyan-500" />
        Effet lumineux
      </div>
      <div className="space-y-3">
        {effects.map((effect, index) => {
          const Icon = effect.icon;
          return (
            <motion.button
              key={effect.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onEffectChange(effect.id)}
              className={`w-full p-4 rounded-xl border transition-all text-left ${
                selectedEffect === effect.id
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                  : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500 hover:bg-gray-600/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedEffect === effect.id
                    ? 'bg-cyan-500/30 text-cyan-300'
                    : 'bg-gray-600/50 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{effect.name}</div>
                  <div className="text-sm opacity-70">{effect.description}</div>
                </div>
                <div className="text-lg font-mono opacity-60">
                  {effect.preview}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EffectSelector;