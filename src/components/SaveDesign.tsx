import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Check, Folder } from 'lucide-react';
import { DesignConfig } from './Customizer';

interface SaveDesignProps {
  design: DesignConfig;
}

const SaveDesign: React.FC<SaveDesignProps> = ({ design }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveDesign = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Save to localStorage for now (in production, this would be a server call)
      const savedDesigns = JSON.parse(localStorage.getItem('lumineon-designs') || '[]');
      const newDesign = {
        ...design,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        name: design.text || 'Sans titre'
      };

      savedDesigns.unshift(newDesign);
      
      // Keep only the last 10 designs
      if (savedDesigns.length > 10) {
        savedDesigns.splice(10);
      }

      localStorage.setItem('lumineon-designs', JSON.stringify(savedDesigns));

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);

    } catch (error) {
      console.error('Save failed:', error);
      alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    } finally {
      setIsSaving(false);
    }
  };

  const getSavedDesigns = () => {
    try {
      return JSON.parse(localStorage.getItem('lumineon-designs') || '[]');
    } catch {
      return [];
    }
  };

  const savedCount = getSavedDesigns().length;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={saveDesign}
        disabled={isSaving || !design.text.trim()}
        className={`px-4 py-3 rounded-xl border font-medium transition-all flex items-center gap-2 ${
          saveSuccess
            ? 'border-green-500 bg-green-500/20 text-green-300'
            : isSaving
            ? 'border-gray-600 bg-gray-700/50 text-gray-400 cursor-not-allowed'
            : 'border-purple-500 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
        }`}
      >
        {saveSuccess ? (
          <Check className="w-5 h-5" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        
        {saveSuccess ? 'Sauvé !' : 'Sauvegarder'}
      </motion.button>

      {/* Saved designs indicator */}
      {savedCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
        >
          {savedCount}
        </motion.div>
      )}

      {/* Saved designs tooltip on hover */}
      <div className="absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg p-3 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 min-w-48">
        <div className="flex items-center gap-2 text-white font-medium mb-2">
          <Folder className="w-4 h-4" />
          Designs sauvegardés ({savedCount})
        </div>
        
        {savedCount > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {getSavedDesigns().slice(0, 5).map((savedDesign: any) => (
              <div key={savedDesign.id} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: savedDesign.color }}
                />
                <span className="text-gray-300 truncate">{savedDesign.name}</span>
              </div>
            ))}
            {savedCount > 5 && (
              <div className="text-xs text-gray-500">
                +{savedCount - 5} autres designs
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-400">
            Aucun design sauvegardé
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveDesign;