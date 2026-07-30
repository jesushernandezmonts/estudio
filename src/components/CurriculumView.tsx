import React from 'react';
import { mathCurriculum } from '../data/mathCurriculum';
import { LessonCard } from './LessonCard';
import { ProgressMap } from '../types';

interface CurriculumViewProps {
  category: 'diferencial' | 'integral' | 'edos';
  title: string;
  subtitle: string;
  headerGradient: string;
  progress: ProgressMap;
  onToggleLesson: (lessonId: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  category,
  title,
  subtitle,
  headerGradient,
  progress,
  onToggleLesson,
}) => {
  const lessons = mathCurriculum[category] || [];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className={`rounded-3xl p-8 md:p-10 ${headerGradient} border border-[#a855f7]/30 shadow-2xl space-y-2`}>
        <h1 className="font-fredoka text-3xl md:text-4xl font-extrabold text-white">
          {title}
        </h1>
        <p className="text-[#e9d5ff]/90 text-base md:text-lg">{subtitle}</p>
      </div>

      {/* Lesson List */}
      <div className="space-y-8">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={!!progress[lesson.id]}
            onToggleComplete={() => onToggleLesson(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
};
