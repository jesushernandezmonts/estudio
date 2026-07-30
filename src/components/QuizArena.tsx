import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { MathRenderer } from './MathRenderer';
import { Award, CheckCircle, HelpCircle, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizArenaProps {
  onAddXP: (amount: number) => void;
}

type QuizCategory = 'diferencial' | 'integral' | 'edos';

export const QuizArena: React.FC<QuizArenaProps> = ({ onAddXP }) => {
  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startQuiz = (cat: QuizCategory) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowHint(false);
    setIsFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (selectedOption !== null || !activeCategory) return;
    setSelectedOption(index);

    const questions = quizQuestions[activeCategory];
    const currentQ = questions[currentIndex];

    if (index === currentQ.correct) {
      setScore((prev) => prev + 1);
      onAddXP(50);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    if (!activeCategory) return;
    const questions = quizQuestions[activeCategory];
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const categoryNames: Record<QuizCategory, string> = {
    diferencial: 'Cálculo Diferencial',
    integral: 'Cálculo Integral',
    edos: 'Ecuaciones Diferenciales',
  };

  return (
    <div className="space-y-8">
      {/* Category Select Cards */}
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#fbbf24]/20 text-[#fbbf24]">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-fredoka text-2xl font-bold text-white">Desafíos Jungkook Arena 🐰</h2>
            <p className="text-sm text-[#c084fc]">
              Demuestra tu conocimiento y gana +50 XP por cada respuesta correcta.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(['diferencial', 'integral', 'edos'] as QuizCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => startQuiz(cat)}
              className={`p-5 rounded-2xl border font-bold text-left transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white border-[#a855f7] shadow-lg shadow-[#a855f7]/30'
                  : 'bg-[#120b24] text-[#e9d5ff] border-[#a855f7]/30 hover:border-[#a855f7] hover:bg-[#a855f7]/10'
              }`}
            >
              <div className="text-xs text-[#f472b6] mb-1">Desafío BTS</div>
              <div className="text-lg">{categoryNames[cat]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Quiz Container */}
      {activeCategory && !isFinished && (
        <div className="bg-[#19112e]/80 border border-[#a855f7]/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          {/* Tracker */}
          <div className="flex justify-between items-center text-sm font-semibold text-[#c084fc] border-b border-[#a855f7]/20 pb-4">
            <span>{categoryNames[activeCategory]}</span>
            <span>
              Pregunta {currentIndex + 1} de {quizQuestions[activeCategory].length}
            </span>
          </div>

          {/* Question & Formula */}
          <div className="space-y-4">
            <h3 className="font-fredoka text-xl font-bold text-white">
              {quizQuestions[activeCategory][currentIndex].question}
            </h3>

            <div className="p-4 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/30 text-center text-lg text-[#c084fc]">
              <MathRenderer math={quizQuestions[activeCategory][currentIndex].formula} block />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {quizQuestions[activeCategory][currentIndex].options.map((optText, i) => {
              const currentQ = quizQuestions[activeCategory][currentIndex];
              const isSelected = selectedOption === i;
              const isCorrect = i === currentQ.correct;

              let btnStyle = 'bg-[#120b24] border-[#a855f7]/30 text-[#e9d5ff] hover:bg-[#a855f7]/15';

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-[#22c55e]/20 border-[#22c55e] text-[#4ade80] font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-[#ef4444]/20 border-[#ef4444] text-[#f87171] font-bold';
                } else {
                  btnStyle = 'bg-[#120b24]/50 border-[#a855f7]/10 text-[#e9d5ff]/40';
                }
              }

              return (
                <button
                  key={i}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(i)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm md:text-base flex items-center gap-3 transition-all ${btnStyle}`}
                >
                  <span className="w-7 h-7 rounded-xl bg-[#a855f7]/20 flex items-center justify-center font-bold text-xs text-[#c084fc]">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{optText}</span>
                </button>
              );
            })}
          </div>

          {/* Hint & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#a855f7]/20">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-sm text-[#f472b6] hover:underline"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ver pista de RM</span>
            </button>

            {selectedOption !== null && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white hover:shadow-lg hover:shadow-[#a855f7]/40 transition-all"
              >
                <span>Siguiente Pregunta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {showHint && (
            <div className="p-4 rounded-2xl bg-[#f472b6]/10 border border-[#f472b6]/30 text-sm text-[#f472b6]">
              💡 <strong>Pista:</strong> {quizQuestions[activeCategory][currentIndex].hint}
            </div>
          )}
        </div>
      )}

      {/* Finished Summary */}
      {isFinished && activeCategory && (
        <div className="bg-[#19112e]/80 border border-[#a855f7]/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md">
          <div className="text-6xl">🎉</div>
          <h2 className="font-fredoka text-3xl font-bold text-white">¡Desafío Completado!</h2>
          <p className="text-lg text-[#e9d5ff]">
            Obtuviste <strong className="text-[#fbbf24]">{score}</strong> de{' '}
            {quizQuestions[activeCategory].length} respuestas correctas.
          </p>
          <div className="text-xl font-bold text-[#fbbf24]">+{score * 50} XP Ganados ⚡</div>
          <button
            onClick={() => startQuiz(activeCategory)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white hover:shadow-lg hover:shadow-[#a855f7]/40 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Volver a Intentar</span>
          </button>
        </div>
      )}
    </div>
  );
};
