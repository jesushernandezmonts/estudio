import React from 'react';
import { Lesson } from '../types';
import { MathRenderer } from './MathRenderer';
import { FormattedMathText } from './FormattedMathText';
import { StepByStepExample } from './StepByStepExample';
import { CheckCircle2, Circle, Lightbulb, BookOpen } from 'lucide-react';
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
    <div className="bg-[#19112e]/90 border border-[#a855f7]/30 rounded-3xl p-6 md:p-8 space-y-7 shadow-2xl backdrop-blur-md transition-all hover:border-[#a855f7]/50">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#a855f7]/20 pb-4">
        <h3 className="font-fredoka text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#f472b6]" />
          <span>{lesson.title}</span>
        </h3>
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#a855f7]/20 text-[#c084fc] border border-[#a855f7]/40 shadow-sm">
          {lesson.badge}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-6 text-sm md:text-base leading-relaxed">
        {/* Intuition BTS Card */}
        <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-[#19112e] via-[#2d1b4e] to-[#19112e] border border-[#f472b6]/30 text-[#e9d5ff]">
          <span className="font-bold text-[#f472b6] block mb-1 flex items-center gap-1.5">
            <span>💜</span> Intuición BTS:
          </span>
          <p className="text-[#e9d5ff]/90 leading-relaxed">{lesson.intro}</p>
        </div>

        {/* Chido Explanation */}
        <div
          className="p-5 rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#e9d5ff]"
          dangerouslySetInnerHTML={{ __html: lesson.chidoExplanation }}
        />

        {/* Concept & Formula */}
        <div className="p-6 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/40 space-y-3 shadow-inner">
          <p className="text-xs font-bold text-[#a855f7] uppercase tracking-wider flex items-center gap-1.5">
            <span>📐</span> Fórmula y Notación Oficial:
          </p>
          <div className="text-sm text-[#e9d5ff]">
            <FormattedMathText text={lesson.concept} />
          </div>
          <div className="pt-3 pb-1 text-center text-xl md:text-2xl font-mono text-[#f472b6] bg-[#140b24] p-4 rounded-xl border border-[#a855f7]/30 shadow-md">
            <MathRenderer math={lesson.formula} block />
          </div>
        </div>

        {/* Visual Step-by-Step Example */}
        <StepByStepExample exampleText={lesson.example} />

        {/* Takeaway Quote */}
        <div className="p-4 rounded-2xl bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-[#fbbf24] shrink-0" />
          <p className="font-semibold text-[#f472b6] text-sm md:text-base">{lesson.takeaway}</p>
        </div>
      </div>

      {/* Footer Complete Button */}
      <div className="pt-4 border-t border-[#a855f7]/20 flex justify-end">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm md:text-base transition-all transform hover:scale-105 ${
            isCompleted
              ? 'bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/40 shadow-lg shadow-[#22c55e]/20'
              : 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white hover:shadow-xl hover:shadow-[#a855f7]/40'
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
