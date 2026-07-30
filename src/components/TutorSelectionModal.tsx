import React, { useState } from 'react';
import { btsTutors, BTSTutor } from '../data/btsTutors';
import { useTutorVoice } from '../hooks/useTutorVoice';
import { Sparkles, CheckCircle2, Heart, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TutorSelectionModalProps {
  isOpen: boolean;
  selectedTutorId: string;
  onSelectTutor: (tutorId: string) => void;
  onClose?: () => void;
  isFirstTime?: boolean;
}

export const TutorSelectionModal: React.FC<TutorSelectionModalProps> = ({
  isOpen,
  selectedTutorId,
  onSelectTutor,
  onClose,
  isFirstTime = false,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(selectedTutorId || 'rm');
  const [activeId, setActiveId] = useState<string>(selectedTutorId || 'rm');
  const { speak, stop, isSpeaking } = useTutorVoice();

  if (!isOpen) return null;

  const currentTutor = btsTutors.find((t) => t.id === activeId) || btsTutors[0];

  const handleListenTutor = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(currentTutor.greeting, { pitch: currentTutor.pitch, rate: currentTutor.rate });
    }
  };

  const handleConfirm = () => {
    stop();
    onSelectTutor(activeId);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl bg-[#140b24] border-2 border-[#a855f7]/50 rounded-3xl p-6 md:p-8 shadow-2xl shadow-[#a855f7]/30 my-8 space-y-6 relative">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f472b6]/20 text-[#f472b6] border border-[#f472b6]/40">
            <Heart className="w-3.5 h-3.5 fill-[#f472b6]" />
            <span>Selección de Tutor BTS 💜</span>
          </span>
          <h2 className="font-fredoka text-2xl md:text-4xl font-extrabold text-white">
            ¿Quién será tu Tutor de Cálculo?
          </h2>
          <p className="text-[#e9d5ff]/80 text-sm md:text-base max-w-xl mx-auto">
            Elige a tu integrante favorito de BTS para guiar tu aprendizaje con consejos, motivación y energía boraland.
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
          {btsTutors.map((tutor) => {
            const isSelected = activeId === tutor.id;
            return (
              <button
                key={tutor.id}
                type="button"
                onClick={() => setActiveId(tutor.id)}
                onMouseEnter={() => setHoveredId(tutor.id)}
                className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#a855f7]/30 to-[#19112e] border-[#f472b6] scale-105 shadow-lg shadow-[#f472b6]/30'
                    : 'bg-[#19112e]/60 border-[#a855f7]/20 hover:border-[#a855f7]/60 hover:bg-[#19112e]'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 bg-[#f472b6] text-white rounded-full p-0.5 shadow-md">
                    <CheckCircle2 className="w-4 h-4 fill-[#f472b6] text-white" />
                  </div>
                )}
                
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${tutor.gradient} flex items-center justify-center text-2xl md:text-3xl shadow-md mb-2`}>
                  {tutor.emoji}
                </div>

                <div className="font-bold text-sm text-white">{tutor.stageName}</div>
                <div className="text-[10px] text-[#c084fc] font-medium text-center line-clamp-1">{tutor.badge}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Tutor Spotlight */}
        <div className="bg-gradient-to-r from-[#19112e] via-[#2d1b4e] to-[#19112e] border border-[#a855f7]/40 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-5">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br ${currentTutor.gradient} flex items-center justify-center text-4xl shadow-xl shrink-0`}>
            {currentTutor.emoji}
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="font-fredoka text-xl font-bold text-white">
                {currentTutor.stageName} ({currentTutor.name})
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#a855f7]/20 text-[#f472b6] font-semibold border border-[#a855f7]/30">
                {currentTutor.role}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <p className="text-sm text-[#e9d5ff]/90 italic flex-1">
                "{currentTutor.greeting}"
              </p>
              <button
                type="button"
                onClick={handleListenTutor}
                className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                  isSpeaking
                    ? 'bg-[#f472b6] text-white border-[#f472b6] shadow-md shadow-[#f472b6]/40 animate-pulse'
                    : 'bg-[#a855f7]/20 text-[#f472b6] border-[#a855f7]/40 hover:bg-[#a855f7]/30'
                }`}
                title={`Escuchar a ${currentTutor.stageName} 🔊`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-[#c084fc]">
              ✨ {currentTutor.description}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2">
          {!isFirstTime && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#c084fc] hover:text-white hover:bg-[#a855f7]/10 transition-all"
            >
              Cancelar
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            className="ml-auto flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#a855f7] via-[#9333ea] to-[#f472b6] hover:shadow-xl hover:shadow-[#a855f7]/50 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 fill-white" />
            <span>¡Elegir a {currentTutor.stageName} como mi Tutor! 💜</span>
          </button>
        </div>
      </div>
    </div>
  );
};
