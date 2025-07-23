import React from 'react';
import { motion } from 'framer-motion';
import { Wrench } from 'lucide-react';

interface MountingSelectorProps {
  selectedMounting: 'holes' | 'chains' | 'sticker' | 'base' | 'stand';
  onMountingChange: (mounting: 'holes' | 'chains' | 'sticker' | 'base' | 'stand') => void;
}

const mountings = [
  {
    id: 'holes' as const,
    name: 'Trous de fixation',
    description: 'Perçage pour vis murales',
    price: '+0€',
    preview: '🔩'
  },
  {
    id: 'chains' as const,
    name: 'Chaînes suspendues',
    description: 'Suspension décorative',
    price: '+10€',
    preview: '⛓️'
  },
  {
    id: 'sticker' as const,
    name: '3M adhésif',
    description: 'Fixation par adhésif fort',
    price: '+5€',
    preview: '📎'
  },
  {
    id: 'base' as const,
    name: 'Socle posé',
    description: 'Base stable pour poser',
    price: '+20€',
    preview: '🏗️'
  },
  {
    id: 'stand' as const,
    name: 'Pied ajustable',
    description: 'Support avec pied réglable',
    price: '+35€',
    preview: '🦵'
  }
];

const MountingSelector: React.FC<MountingSelectorProps> = ({ selectedMounting, onMountingChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Wrench className="w-5 h-5 text-orange-500" />
        Système de montage
      </div>

      <div className="space-y-3">
        {mountings.map((mounting, index) => (
          <motion.button
            key={mounting.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onMountingChange(mounting.id)}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              selectedMounting === mounting.id
                ? 'border-orange-500 bg-orange-500/20 text-orange-300'
                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{mounting.preview}</div>
              <div className="flex-1">
                <div className="font-medium">{mounting.name}</div>
                <div className="text-sm opacity-70">{mounting.description}</div>
              </div>
              <div className={`text-sm font-semibold ${
                selectedMounting === mounting.id ? 'text-orange-300' : 'text-gray-400'
              }`}>
                {mounting.price}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MountingSelector;