import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TextInput from './TextInput';
import ColorPicker from './ColorPicker';
import EffectSelector from './EffectSelector';
import SizeSelector from './SizeSelector';
import SupportSelector from './SupportSelector';
import MountingSelector from './MountingSelector';
import PreviewCanvas from './PreviewCanvas';
import ExportButton from './ExportButton';
import SaveDesign from './SaveDesign';
import { Settings, Zap } from 'lucide-react';

export interface DesignConfig {
  text: string;
  color: string;
  effect: 'static' | 'blink' | 'gradient' | 'fade';
  width: number;
  height: number;
  support: 'cut' | 'printed' | 'colored';
  mounting: 'holes' | 'chains' | 'sticker' | 'base' | 'stand';
  background: 'brick' | 'concrete' | 'room';
}

const Customizer: React.FC = () => {
  const [design, setDesign] = useState<DesignConfig>({
    text: 'LumiNéon',
    color: '#FF006E',
    effect: 'static',
    width: 400,
    height: 100,
    support: 'cut',
    mounting: 'holes',
    background: 'brick'
  });

  const [activeTab, setActiveTab] = useState<'text' | 'style' | 'support'>('text');

  const updateDesign = (updates: Partial<DesignConfig>) => {
    setDesign(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 backdrop-blur-lg bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className="w-8 h-8 text-pink-500" />
                <div className="absolute inset-0 blur-sm bg-pink-500 opacity-50"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                LumiNéon Studio
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <SaveDesign design={design} />
              <ExportButton design={design} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-700">
                {[
                  { id: 'text' as const, label: 'Texte', icon: '✍️' },
                  { id: 'style' as const, label: 'Style', icon: '🎨' },
                  { id: 'support' as const, label: 'Support', icon: '🔧' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {activeTab === 'text' && (
                    <>
                      <TextInput value={design.text} onChange={(text) => updateDesign({ text })} />
                      <ColorPicker selectedColor={design.color} onColorChange={(color) => updateDesign({ color })} />
                      <EffectSelector selectedEffect={design.effect} onEffectChange={(effect) => updateDesign({ effect })} />
                    </>
                  )}

                  {activeTab === 'style' && (
                    <>
                      <SizeSelector 
                        width={design.width} 
                        height={design.height} 
                        onSizeChange={(width, height) => updateDesign({ width, height })} 
                      />
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Arrière-plan</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { id: 'brick' as const, label: 'Brique', preview: '🧱' },
                            { id: 'concrete' as const, label: 'Béton', preview: '🏢' },
                            { id: 'room' as const, label: 'Intérieur', preview: '🏠' }
                          ].map(bg => (
                            <button
                              key={bg.id}
                              onClick={() => updateDesign({ background: bg.id })}
                              className={`p-3 rounded-lg border transition-all ${
                                design.background === bg.id
                                  ? 'border-pink-500 bg-pink-500/20 text-pink-300'
                                  : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:border-gray-500'
                              }`}
                            >
                              <div className="text-2xl mb-1">{bg.preview}</div>
                              <div className="text-xs">{bg.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'support' && (
                    <>
                      <SupportSelector selectedSupport={design.support} onSupportChange={(support) => updateDesign({ support })} />
                      <MountingSelector selectedMounting={design.mounting} onMountingChange={(mounting) => updateDesign({ mounting })} />
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    Aperçu en temps réel
                  </h2>
                  <div className="text-sm text-gray-400">
                    {design.width} × {design.height} px
                  </div>
                </div>
                <PreviewCanvas design={design} />
              </div>
            </div>

            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-3">Votre design personnalisé</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Texte:</span>
                    <span className="text-white font-medium">{design.text}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Effet:</span>
                    <span className="text-white font-medium capitalize">{design.effect}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="text-white font-medium">{design.width}×{design.height}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Support:</span>
                    <span className="text-white font-medium capitalize">{design.support}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Montage:</span>
                    <span className="text-white font-medium capitalize">{design.mounting}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Couleur:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-600" 
                        style={{ backgroundColor: design.color }}
                      />
                      <span className="text-white font-medium">{design.color}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customizer;