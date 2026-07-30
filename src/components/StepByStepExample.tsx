import React from 'react';
import { FormattedMathText } from './FormattedMathText';
import { CheckCircle, AlertCircle, Sparkles, ArrowRight, ArrowDown } from 'lucide-react';

interface StepByStepExampleProps {
  exampleText: string;
}

interface StepItem {
  number: number;
  title?: string;
  content: string;
  isError?: boolean;
  isResult?: boolean;
}

export const StepByStepExample: React.FC<StepByStepExampleProps> = ({ exampleText }) => {
  if (!exampleText) return null;

  // Split exampleText into intro/problem and steps
  const lines = exampleText.split('\n').map((l) => l.trim()).filter(Boolean);

  let introText = '';
  const rawSteps: string[] = [];

  lines.forEach((line) => {
    if (line.match(/^(\d+\)|Paso\s*\d+|🔍)/i)) {
      if (line.startsWith('🔍') && !rawSteps.length) {
        introText = line;
      } else {
        rawSteps.push(line);
      }
    } else {
      if (!rawSteps.length) {
        introText += (introText ? ' ' : '') + line;
      } else {
        // Append to previous step if part of multiline step
        rawSteps[rawSteps.length - 1] += ' ' + line;
      }
    }
  });

  // Parse structured step objects
  const steps: StepItem[] = rawSteps.map((rawStep, index) => {
    const cleanedStep = rawStep.replace(/^(\d+\)\s*|\*\*\d+\)\*\*|\d+\.\s*)/, '');
    
    // Check if there is a title like **Paso 1:** or **Regla Mágica:**
    let title = '';
    let content = cleanedStep;

    const titleMatch = cleanedStep.match(/^(\*\*.*?\*\*|Paso\s*\d+:?|Regla\s*Mágica:?|Capa\s*de\s*\w+:?|Resultados?:?|Elegimos:?)/i);
    if (titleMatch) {
      title = titleMatch[0].replace(/\*\*/g, '').replace(/:$/, '');
      content = cleanedStep.substring(titleMatch[0].length).trim();
    }

    const lower = cleanedStep.toLowerCase();
    const isError = lower.includes('error') || lower.includes('0/0') || lower.includes('problema');
    const isResult = lower.includes('resultado') || lower.includes('¡listo!') || lower.includes('cima') || lower.includes('área exacta') || index === rawSteps.length - 1;

    return {
      number: index + 1,
      title: title || `Paso ${index + 1}`,
      content: content || cleanedStep,
      isError,
      isResult,
    };
  });

  return (
    <div className="space-y-6 bg-gradient-to-b from-[#140b24] to-[#19112e] border-2 border-[#f472b6]/40 rounded-3xl p-5 md:p-7 shadow-2xl relative overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Example Header */}
      <div className="flex items-start gap-3 border-b border-[#a855f7]/20 pb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#f472b6] to-[#a855f7] text-white shadow-lg shadow-[#f472b6]/30 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#f472b6]/20 text-[#f472b6] border border-[#f472b6]/30">
              Guía Visual Paso a Paso
            </span>
          </div>
          <div className="font-fredoka text-lg md:text-xl font-bold text-white leading-snug">
            <FormattedMathText text={introText || 'Ejemplo Desarrollado Paso a Paso:'} />
          </div>
        </div>
      </div>

      {/* Stepper Timeline */}
      <div className="relative pl-3 md:pl-6 space-y-6 before:absolute before:left-[19px] md:before:left-[31px] before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-[#a855f7] before:via-[#f472b6] before:to-[#22c55e]">
        {steps.map((step) => {
          return (
            <div key={step.number} className="relative flex items-start gap-4 group">
              {/* Stepper Node Icon */}
              <div
                className={`w-9 h-9 md:w-11 md:h-11 rounded-2xl flex items-center justify-center font-bold text-sm md:text-base text-white shadow-xl shrink-0 z-10 transition-transform group-hover:scale-110 ${
                  step.isResult
                    ? 'bg-gradient-to-tr from-[#22c55e] to-[#4ade80] shadow-[#22c55e]/40 ring-4 ring-[#22c55e]/20'
                    : step.isError
                    ? 'bg-gradient-to-tr from-[#ef4444] to-[#f87171] shadow-[#ef4444]/40'
                    : 'bg-gradient-to-tr from-[#a855f7] to-[#f472b6] shadow-[#a855f7]/40'
                }`}
              >
                {step.isResult ? (
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <span>{step.number}</span>
                )}
              </div>

              {/* Step Card Content */}
              <div
                className={`flex-1 rounded-2xl p-4 md:p-5 border transition-all ${
                  step.isResult
                    ? 'bg-gradient-to-r from-[#22c55e]/15 via-[#19112e] to-[#22c55e]/10 border-[#22c55e]/60 shadow-lg shadow-[#22c55e]/15'
                    : step.isError
                    ? 'bg-[#19112e] border-[#ef4444]/40'
                    : 'bg-[#0f0a1c]/80 border-[#a855f7]/30 hover:border-[#a855f7]/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`font-fredoka font-bold text-xs md:text-sm px-2.5 py-1 rounded-lg border ${
                      step.isResult
                        ? 'bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/40'
                        : step.isError
                        ? 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40'
                        : 'bg-[#a855f7]/20 text-[#e9d5ff] border-[#a855f7]/30'
                    }`}
                  >
                    {step.title}
                  </span>

                  {step.isError && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#f87171] bg-[#ef4444]/15 px-2 py-0.5 rounded-full border border-[#ef4444]/30">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>¡Atención aquí!</span>
                    </span>
                  )}

                  {step.isResult && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#4ade80] bg-[#22c55e]/15 px-2 py-0.5 rounded-full border border-[#22c55e]/30">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>¡Resultado Solucionado! 🎯</span>
                    </span>
                  )}
                </div>

                <div className="text-sm md:text-base text-[#e9d5ff] leading-relaxed">
                  <FormattedMathText text={step.content} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
