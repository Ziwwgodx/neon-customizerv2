import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

interface SizeSelectorProps {
  width: number;
  height: number;
  onSizeChange: (width: number, height: number) => void;
}

const presetSizes = [
  { name: 'Petit', width: 300, height: 80, desc: 'Idéal pour décoration' },
  { name: 'Moyen', width: 400, height: 100, desc: 'Équilibré et visible' },
  { name: 'Grand', width: 600, height: 150, desc: 'Impact maximum' },
  { name: 'XL', width: 800, height: 200, desc: 'Enseigne premium' }
];

const SizeSelector: React.FC<SizeSelectorProps> = ({ width, height, onSizeChange }) => {
  const isCustom = !presetSizes.some(size => size.width === width && size.height === height);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Maximize2 className="w-5 h-5 text-blue-500" />
        Dimensions
      </div>

      {/* Preset Sizes */}
      <div className="grid grid-cols-2 gap-3">
        {presetSizes.map((size, index) => (
          <motion.button
            key={size.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSizeChange(size.width, size.height)}
            className={`p-3 rounded-lg border text-left transition-all ${
              width === size.width && height === size.height
                ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
            }`}
          >
            <div className="font-medium">{size.name}</div>
            <div className="text-xs opacity-70 mb-2">{size.desc}</div>
            <div className="text-xs font-mono text-blue-400">
              {size.width} × {size.height}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Custom Size */}
      <div className="space-y-3">
        <div className="text-sm text-gray-400">Taille personnalisée</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Largeur (px)</label>
            <input
              type="number"
              value={width}
              onChange={(e) => onSizeChange(parseInt(e.target.value) || 0, height)}
              min="100"
              max="1200"
              step="10"
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Hauteur (px)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => onSizeChange(width, parseInt(e.target.value) || 0)}
              min="50"
              max="400"
              step="10"
              className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Ratio: {(width / height).toFixed(2)}:1
        </div>
      </div>
    </motion.div>
  );
};

export default SizeSelector;