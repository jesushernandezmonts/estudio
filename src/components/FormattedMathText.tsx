import React from 'react';
import { MathRenderer } from './MathRenderer';

interface FormattedMathTextProps {
  text: string;
  className?: string;
}

export const FormattedMathText: React.FC<FormattedMathTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Split text by '$' to separate math from text
  const parts = text.split('$');

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Odd index = math formula
        if (index % 2 === 1) {
          return (
            <span key={index} className="inline-block px-1 font-mono text-[#f472b6] font-semibold">
              <MathRenderer math={part} block={false} />
            </span>
          );
        }

        // Even index = regular text with possible **bold** markdown
        const boldParts = part.split(/(\*\*.*?\*\*)/g);
        return (
          <span key={index}>
            {boldParts.map((subPart, subIdx) => {
              if (subPart.startsWith('**') && subPart.endsWith('**')) {
                const boldContent = subPart.slice(2, -2);
                return (
                  <strong key={subIdx} className="font-bold text-white">
                    {boldContent}
                  </strong>
                );
              }
              return <span key={subIdx}>{subPart}</span>;
            })}
          </span>
        );
      })}
    </span>
  );
};
