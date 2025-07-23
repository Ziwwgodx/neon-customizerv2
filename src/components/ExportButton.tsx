import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Image as ImageIcon, Loader } from 'lucide-react';
import { DesignConfig } from './Customizer';

interface ExportButtonProps {
  design: DesignConfig;
}

const ExportButton: React.FC<ExportButtonProps> = ({ design }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const exportDesign = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      // Create a high-resolution canvas for export
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Set high resolution (2x for retina)
      const scale = 2;
      canvas.width = design.width * scale;
      canvas.height = design.height * scale;
      ctx.scale(scale, scale);

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, design.width, design.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, design.width, design.height);

      // Calculate font size based on design dimensions
      const fontSize = Math.min(design.width / design.text.length * 1.2, design.height * 0.6, 120);
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const centerX = design.width / 2;
      const centerY = design.height / 2;

      // Draw multiple glow layers for realistic neon effect
      const glowLayers = [
        { blur: 40, alpha: 0.3 },
        { blur: 30, alpha: 0.4 },
        { blur: 20, alpha: 0.6 },
        { blur: 15, alpha: 0.8 },
        { blur: 8, alpha: 1 },
      ];

      glowLayers.forEach(layer => {
        ctx.save();
        ctx.shadowColor = design.color;
        ctx.shadowBlur = layer.blur;
        ctx.globalAlpha = layer.alpha;
        ctx.fillStyle = design.color;
        ctx.fillText(design.text, centerX, centerY);
        ctx.restore();
      });

      // Draw main text
      ctx.save();
      ctx.fillStyle = design.color;
      ctx.strokeStyle = design.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = design.color;
      ctx.shadowBlur = 15;
      ctx.fillText(design.text, centerX, centerY);
      ctx.strokeText(design.text, centerX, centerY);
      ctx.restore();

      // Add bright white core
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(design.text, centerX, centerY);
      ctx.restore();

      // Export as PNG
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `lumineon-${design.text.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          setExportSuccess(true);
          setTimeout(() => setExportSuccess(false), 3000);
        }
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Export failed:', error);
      alert('Erreur lors de l\'export. Veuillez réessayer.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={exportDesign}
      disabled={isExporting || !design.text.trim()}
      className={`px-6 py-3 rounded-xl border font-medium transition-all flex items-center gap-2 ${
        exportSuccess
          ? 'border-green-500 bg-green-500/20 text-green-300'
          : isExporting
          ? 'border-gray-600 bg-gray-700/50 text-gray-400 cursor-not-allowed'
          : 'border-pink-500 bg-pink-500/20 text-pink-300 hover:bg-pink-500/30'
      }`}
    >
      {isExporting ? (
        <Loader className="w-5 h-5 animate-spin" />
      ) : exportSuccess ? (
        <ImageIcon className="w-5 h-5" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      
      {isExporting ? 'Export...' : exportSuccess ? 'Exporté !' : 'Exporter PNG'}
    </motion.button>
  );
};

export default ExportButton;