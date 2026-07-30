import React from 'react';
import { Menu, Search, Music, HeartHandshake, Zap } from 'lucide-react';
import { BTSTutor } from '../data/btsTutors';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenCustomModal: () => void;
  onOpenTutorModal: () => void;
  selectedTutor: BTSTutor;
  xpPoints: number;
  isLofiPlaying: boolean;
  onToggleLofi: () => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenCustomModal,
  onOpenTutorModal,
  selectedTutor,
  xpPoints,
  isLofiPlaying,
  onToggleLofi,
  onSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#120b24]/80 backdrop-blur-md border-b border-[#a855f7]/20 px-4 lg:px-8 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-[#c084fc] hover:text-white p-2 rounded-lg bg-[#a855f7]/10"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative hidden sm:block w-52 md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c084fc]" />
          <input
            type="text"
            placeholder="Buscar concepto..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 text-white placeholder-[#c084fc]/60 focus:outline-none focus:border-[#a855f7] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Selected Tutor Badge Button */}
        <button
          onClick={onOpenTutorModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#a855f7]/20 to-[#f472b6]/20 border border-[#f472b6]/40 hover:border-[#f472b6] transition-all shadow-sm"
          title="Cambiar Tutor de BTS 💜"
        >
          <span className="text-xl">{selectedTutor.emoji}</span>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-white leading-tight">
              Tutor: {selectedTutor.stageName}
            </div>
            <div className="text-[10px] text-[#f472b6]">Cambiar 💜</div>
          </div>
        </button>

        {/* Lo-Fi Music Player */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30">
          <button
            onClick={onToggleLofi}
            className={`p-1.5 rounded-lg transition-all ${
              isLofiPlaying
                ? 'bg-[#f472b6] text-white shadow-md shadow-[#f472b6]/40 animate-pulse'
                : 'bg-[#a855f7]/20 text-[#c084fc] hover:text-white'
            }`}
            title="Reproducir Lo-Fi BTS en piano 🎹"
          >
            <Music className="w-4 h-4" />
          </button>
          <div className="hidden lg:block text-xs">
            <div className="font-semibold text-white leading-tight">Magic Shop 🎹 Lo-Fi</div>
            <div className="text-[10px] text-[#c084fc]">
              {isLofiPlaying ? 'Reproduciendo 💜' : 'Click para escuchar'}
            </div>
          </div>
        </div>

        {/* Personalization Button */}
        <button
          onClick={onOpenCustomModal}
          className="p-2 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#c084fc] hover:text-white hover:border-[#a855f7] transition-all"
          title="Personalizar usuario"
        >
          <HeartHandshake className="w-5 h-5" />
        </button>

        {/* XP Counter Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#fbbf24]/20 to-[#a855f7]/20 border border-[#fbbf24]/40 font-bold text-sm text-[#fbbf24]">
          <Zap className="w-4 h-4 fill-[#fbbf24] animate-bounce" />
          <span>{xpPoints} XP</span>
        </div>
      </div>
    </header>
  );
};
