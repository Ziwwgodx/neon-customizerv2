import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const neonColors = [
  '#FF006E', // Pink néon
  '#8338EC', // Purple néon
  '#3A86FF', // Blue néon
  '#06FFA5', // Green néon
  '#FFD60A', // Yellow néon
  '#FF4500', // Orange néon
  '#FF1744', // Red néon
  '#00E5FF', // Cyan néon
  '#76FF03', // Lime néon
  '#E91E63', // Pink deep
  '#9C27B0', // Purple deep
  '#2196F3', // Blue deep
  '#00BCD4', // Teal
  '#4CAF50', // Green
  '#FF9800', // Orange
  '#F44336', // Red
  '#FFFFFF', // White
  '#FF6B9D', // Pink pastel
];

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 text-white font-semibold">
        <Palette className="w-5 h-5 text-purple-500" />
        Couleur LED
      </div>
      <div className="grid grid-cols-6 gap-3">
        {neonColors.map((color, index) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onColorChange(color)}
            className={`w-12 h-12 rounded-xl border-2 transition-all relative group ${
              selectedColor === color
                ? 'border-white shadow-lg scale-110'
                : 'border-gray-600 hover:border-gray-400'
            }`}
            style={{ backgroundColor: color }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"
              style={{ backgroundColor: color }}
            />
            {/* Selection indicator */}
            {selectedColor === color && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
      <div className="text-xs text-gray-400 flex items-center justify-between">
        <span>Couleur sélectionnée:</span>
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded border border-gray-600" 
            style={{ backgroundColor: selectedColor }}
          />
          <span className="font-mono text-white">{selectedColor}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorPicker;