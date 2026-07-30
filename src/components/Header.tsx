import React from 'react';
import { Menu, Search, Music, HeartHandshake, Zap } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenCustomModal: () => void;
  xpPoints: number;
  isLofiPlaying: boolean;
  onToggleLofi: () => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenCustomModal,
  xpPoints,
  isLofiPlaying,
  onToggleLofi,
  onSearch,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#120b24]/80 backdrop-blur-md border-b border-[#a855f7]/20 px-4 lg:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-[#c084fc] hover:text-white p-2 rounded-lg bg-[#a855f7]/10"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c084fc]" />
          <input
            type="text"
            placeholder="Buscar concepto (ej. Derivada, Límite)..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-sm rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 text-white placeholder-[#c084fc]/60 focus:outline-none focus:border-[#a855f7] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
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
          <div className="hidden md:block text-xs">
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
