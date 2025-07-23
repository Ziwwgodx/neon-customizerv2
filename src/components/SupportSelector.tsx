import React from 'react';
import { motion } from 'framer-motion';
import { Square } from 'lucide-react';

interface SupportSelectorProps {
  selectedSupport: 'cut' | 'printed' | 'colored';
  onSupportChange: (support: 'cut' | 'printed' | 'colored') => void;
}

const supports = [
  {
    id: 'cut' as const,
    name: 'Découpe',
    description: 'Acrylique transparent découpé',
    price: '+0€',
    preview: '✂️'
  },
  {
    id: 'printed' as const,
    name: 'Imprimé',
    description: 'Motif imprimé sur acrylique',
    price: '+15€',
    preview: '🖨️'
  },
  {
    id: 'colored' as const,
    name: 'Coloré',
    description: 'Acrylique teinté dans la masse',
    price: '+25€',
    preview: '🎨'
  }
];

const SupportSelector: React.FC<SupportSelectorProps> = ({ selectedSupport, onSupportChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Square className="w-5 h-5 text-green-500" />
        Support acrylique
      </div>

      <div className="space-y-3">
        {supports.map((support, index) => (
          <motion.button
            key={support.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSupportChange(support.id)}
            className={`w-full p-4 rounded-xl border transition-all text-left ${
              selectedSupport === support.id
                ? 'border-green-500 bg-green-500/20 text-green-300'
                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{support.preview}</div>
              <div className="flex-1">
                <div className="font-medium">{support.name}</div>
                <div className="text-sm opacity-70">{support.description}</div>
              </div>
              <div className={`text-sm font-semibold ${
                selectedSupport === support.id ? 'text-green-300' : 'text-gray-400'
              }`}>
                {support.price}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default SupportSelector;