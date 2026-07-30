import React from 'react';
import { Lesson } from '../types';
import { MathRenderer } from './MathRenderer';
import { CheckCircle2, Circle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
}) => {
  const handleToggle = () => {
    onToggleComplete();
    if (!isCompleted) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-md transition-all hover:border-[#a855f7]/50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#a855f7]/20 pb-4">
        <h3 className="font-fredoka text-xl md:text-2xl font-bold text-white">
          {lesson.title}
        </h3>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/30">
          {lesson.badge}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 text-sm md:text-base leading-relaxed">
        <p className="text-[#e9d5ff]">
          <strong className="text-[#f472b6]">Intuición BTS:</strong> {lesson.intro}
        </p>

        <div
          className="p-4 rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#e9d5ff]"
          dangerouslySetInnerHTML={{ __html: lesson.chidoExplanation }}
        />

        <div className="p-5 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/30 space-y-2">
          <p className="text-xs font-semibold text-[#a855f7] uppercase tracking-wider">
            Fórmula y Notación Oficial:
          </p>
          <p className="text-sm text-[#e9d5ff]">{lesson.concept}</p>
          <div className="pt-2 text-center text-lg md:text-xl font-mono text-[#c084fc]">
            <MathRenderer math={lesson.formula} block />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#120b24] border border-[#f472b6]/30 space-y-2">
          <div className="font-bold text-[#f472b6] text-sm">📝 Ejemplo Desarrollado Paso a Paso:</div>
          <div className="text-sm text-[#e9d5ff] whitespace-pre-line leading-relaxed">
            {lesson.example}
          </div>
        </div>

        <p className="font-semibold text-[#f472b6] pt-2">{lesson.takeaway}</p>
      </div>

      {/* Footer Complete Button */}
      <div className="pt-4 border-t border-[#a855f7]/20 flex justify-end">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
            isCompleted
              ? 'bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40'
              : 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white hover:shadow-lg hover:shadow-[#a855f7]/40'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              <span>Lección Completada 💜</span>
            </>
          ) : (
            <>
              <Circle className="w-5 h-5" />
              <span>Marcar como Completada (+30 XP)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
