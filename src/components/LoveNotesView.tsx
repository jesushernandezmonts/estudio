import React from 'react';
import { defaultLoveNotes } from '../data/loveNotes';
import { Heart, Lock } from 'lucide-react';

interface LoveNotesViewProps {
  userXP: number;
}

export const LoveNotesView: React.FC<LoveNotesViewProps> = ({ userXP }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#f472b6]/20 text-[#f472b6]">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-white">
              Cartas de Amor Borahae 💜
            </h2>
            <p className="text-sm text-[#c084fc]">
              Desbloquea mensajes especiales de los integrantes de BTS acumulando experiencia (XP).
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {defaultLoveNotes.map((note) => {
          let isUnlocked = false;
          if (note.id === 1 && userXP >= 150) isUnlocked = true;
          if (note.id === 2 && userXP >= 250) isUnlocked = true;
          if (note.id === 3 && userXP >= 350) isUnlocked = true;
          if (note.id === 4 && userXP >= 450) isUnlocked = true;
          if (note.id === 5 && userXP >= 500) isUnlocked = true;

          return (
            <div
              key={note.id}
              className={`rounded-3xl p-6 space-y-4 border transition-all ${
                isUnlocked
                  ? 'bg-[#19112e]/90 border-[#f472b6]/50 shadow-xl shadow-[#f472b6]/10'
                  : 'bg-[#120b24]/50 border-[#a855f7]/20 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{isUnlocked ? note.icon : '🔒'}</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    isUnlocked
                      ? 'bg-[#f472b6]/20 text-[#f472b6] border-[#f472b6]/40'
                      : 'bg-[#a855f7]/10 text-[#c084fc] border-[#a855f7]/20'
                  }`}
                >
                  {isUnlocked ? 'Desbloqueado 💜' : note.req}
                </span>
              </div>

              <h3 className="font-fredoka text-lg font-bold text-white">{note.title}</h3>

              <p className="text-sm leading-relaxed text-[#e9d5ff]">
                {isUnlocked ? (
                  note.text
                ) : (
                  <span className="italic text-[#c084fc]/70 flex items-center gap-2">
                    <Lock className="w-4 h-4 inline" /> Requisito: {note.req}
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
