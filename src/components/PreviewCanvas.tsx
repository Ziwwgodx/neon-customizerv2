import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DesignConfig } from './Customizer';

interface PreviewCanvasProps {
  design: DesignConfig;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ design }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getBackgroundImage = (type: string) => {
    switch (type) {
      case 'brick':
        return 'data:image/svg+xml,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
            <defs>
              <pattern id="brick" patternUnits="userSpaceOnUse" width="120" height="60">
                <rect width="120" height="60" fill="#8B4513"/>
                <rect width="58" height="28" x="1" y="1" fill="#A0522D" stroke="#654321" stroke-width="0.5"/>
                <rect width="58" height="28" x="61" y="1" fill="#A0522D" stroke="#654321" stroke-width="0.5"/>
                <rect width="58" height="28" x="31" y="31" fill="#A0522D" stroke="#654321" stroke-width="0.5"/>
                <rect width="58" height="28" x="91" y="31" fill="#A0522D" stroke="#654321" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brick)"/>
          </svg>
        `);
      case 'concrete':
        return 'data:image/svg+xml,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
            <rect width="100%" height="100%" fill="#696969"/>
            <filter id="noise">
              <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
              <feColorMatrix values="0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 0 0.4 0 0 0 1 0"/>
              <feComposite operator="multiply" in2="SourceGraphic"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" opacity="0.3"/>
          </svg>
        `);
      case 'room':
        return 'data:image/svg+xml,' + encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
            <defs>
              <linearGradient id="roomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2C3E50"/>
                <stop offset="100%" stop-color="#34495E"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#roomGrad)"/>
            <rect width="100%" height="20" y="280" fill="#1A252F"/>
          </svg>
        `);
      default:
        return '';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    
    ctx.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw background
    const bgImage = new Image();
    bgImage.onload = () => {
      ctx.drawImage(bgImage, 0, 0, rect.width, rect.height);
      drawNeonText();
    };
    bgImage.src = getBackgroundImage(design.background);

    const drawNeonText = () => {
      if (!design.text.trim()) return;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate font size based on design dimensions and available space
      const maxWidth = Math.min(rect.width * 0.8, design.width);
      const fontSize = Math.min(maxWidth / design.text.length * 1.2, design.height * 0.6, 60);
      
      ctx.font = `bold ${fontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Multiple glow layers for realistic neon effect
      const glowLayers = [
        { blur: 30, alpha: 0.3, offsetY: 0 },
        { blur: 20, alpha: 0.4, offsetY: 0 },
        { blur: 15, alpha: 0.6, offsetY: 0 },
        { blur: 10, alpha: 0.8, offsetY: 0 },
        { blur: 5, alpha: 1, offsetY: 0 },
      ];

      // Draw glow layers
      glowLayers.forEach(layer => {
        ctx.save();
        ctx.shadowColor = design.color;
        ctx.shadowBlur = layer.blur;
        ctx.globalAlpha = layer.alpha;
        ctx.fillStyle = design.color;
        ctx.fillText(design.text, centerX, centerY + layer.offsetY);
        ctx.restore();
      });

      // Draw main text with inner glow
      ctx.save();
      ctx.fillStyle = design.color;
      ctx.strokeStyle = design.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = design.color;
      ctx.shadowBlur = 8;
      ctx.fillText(design.text, centerX, centerY);
      ctx.strokeText(design.text, centerX, centerY);
      ctx.restore();

      // Add white core for more realistic look
      ctx.save();
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(design.text, centerX, centerY);
      ctx.restore();

      // Apply effect animations
      if (design.effect !== 'static') {
        applyEffect();
      }
    };

    const applyEffect = () => {
      // Animation effects would be implemented here
      // For now, we'll add a subtle pulsing effect for non-static modes
      if (design.effect === 'fade' || design.effect === 'blink') {
        ctx.save();
        ctx.globalAlpha = 0.8 + 0.2 * Math.sin(Date.now() * 0.003);
        ctx.restore();
      }
    };

    // If background image fails to load, draw background color and text
    const fallbackDraw = setTimeout(() => {
      // Draw solid background
      ctx.fillStyle = design.background === 'brick' ? '#8B4513' : 
                     design.background === 'concrete' ? '#696969' : '#2C3E50';
      ctx.fillRect(0, 0, rect.width, rect.height);
      drawNeonText();
    }, 100);

    return () => {
      clearTimeout(fallbackDraw);
    };
  }, [design]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="relative bg-gray-900 rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-80 block"
          style={{ 
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.8), rgba(0,0,0,0.95))',
            imageRendering: 'high-quality'
          }}
        />
        
        {/* Effect overlay for animations */}
        {design.effect !== 'static' && (
          <div className="absolute inset-0 pointer-events-none">
            {design.effect === 'blink' && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              />
            )}
            {design.effect === 'gradient' && (
              <motion.div
                animate={{ 
                  background: [
                    `linear-gradient(45deg, ${design.color}22, transparent)`,
                    `linear-gradient(90deg, transparent, ${design.color}22)`,
                    `linear-gradient(135deg, ${design.color}22, transparent)`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0"
              />
            )}
            {design.effect === 'fade' && (
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{ backgroundColor: `${design.color}10` }}
              />
            )}
          </div>
        )}

        {/* Ambient light simulation */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle at center, ${design.color}30 0%, transparent 60%)`
          }}
        />
      </div>

      {/* Preview controls */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
        <div className="flex items-center gap-4">
          <span>Arrière-plan: {design.background}</span>
          <span>Effet: {design.effect}</span>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: design.color, boxShadow: `0 0 10px ${design.color}` }}
          />
          <span>Aperçu temps réel</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PreviewCanvas;