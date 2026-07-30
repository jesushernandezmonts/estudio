import React, { useState } from 'react';
import { ViewType, ProgressMap } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLofiPlayer } from './hooks/useLofiPlayer';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CurriculumView } from './components/CurriculumView';
import { TangentLab } from './components/labs/TangentLab';
import { RiemannLab } from './components/labs/RiemannLab';
import { DirectionFieldLab } from './components/labs/DirectionFieldLab';
import { FreeLab } from './components/labs/FreeLab';
import { QuizArena } from './components/QuizArena';
import { LoveNotesView } from './components/LoveNotesView';
import { CustomizationModal } from './components/CustomizationModal';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  const [userName, setUserName] = useLocalStorage<string>('mathverse_user_name', 'ARMY Estrella 💜');
  const [userXP, setUserXP] = useLocalStorage<number>('mathverse_xp', 0);
  const [progress, setProgress] = useLocalStorage<ProgressMap>('mathverse_progress', {});

  const { isPlaying: isLofiPlaying, toggleLofi, playChime } = useLofiPlayer();

  const handleToggleLesson = (lessonId: string) => {
    const isDone = !progress[lessonId];
    setProgress((prev) => ({ ...prev, [lessonId]: isDone }));
    if (isDone) {
      setUserXP((prev) => prev + 30);
      playChime();
    }
  };

  const handleAddXP = (amount: number) => {
    setUserXP((prev) => prev + amount);
  };

  // Stats calculation
  const diffDoneCount = ['diff-1', 'diff-2', 'diff-3', 'diff-4'].filter((id) => progress[id]).length;
  const intDoneCount = ['int-1', 'int-2', 'int-3', 'int-4'].filter((id) => progress[id]).length;
  const edoDoneCount = ['edo-1', 'edo-2', 'edo-3', 'edo-4'].filter((id) => progress[id]).length;

  let unlockedLoveNotes = 0;
  if (userXP >= 150) unlockedLoveNotes++;
  if (userXP >= 250) unlockedLoveNotes++;
  if (userXP >= 350) unlockedLoveNotes++;
  if (userXP >= 450) unlockedLoveNotes++;
  if (userXP >= 500) unlockedLoveNotes++;

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            userName={userName}
            onSelectView={setCurrentView}
            diffDoneCount={diffDoneCount}
            intDoneCount={intDoneCount}
            edoDoneCount={edoDoneCount}
            playChime={playChime}
          />
        );
      case 'diferencial':
        return (
          <CurriculumView
            category="diferencial"
            title="Cálculo Diferencial 📐 (RM & Hobi)"
            subtitle="El estudio del cambio instantáneo, velocidades y tangentes."
            headerGradient="bg-gradient-to-r from-[#19112e] via-[#2d1b4e] to-[#a855f7]/30"
            progress={progress}
            onToggleLesson={handleToggleLesson}
          />
        );
      case 'integral':
        return (
          <CurriculumView
            category="integral"
            title="Cálculo Integral ♾️ (Jin & Jimin)"
            subtitle="La acumulación de áreas perfectas y rompecabezas de sumas."
            headerGradient="bg-gradient-to-r from-[#19112e] via-[#431407] to-[#f472b6]/30"
            progress={progress}
            onToggleLesson={handleToggleLesson}
          />
        );
      case 'edos':
        return (
          <CurriculumView
            category="edos"
            title="Ecuaciones Diferenciales 🌀 (Suga & V)"
            subtitle="Modelando las reglas de cambio en la naturaleza y el universo."
            headerGradient="bg-gradient-to-r from-[#19112e] via-[#0c4a6e] to-[#38bdf8]/30"
            progress={progress}
            onToggleLesson={handleToggleLesson}
          />
        );
      case 'lab-tangente':
        return <TangentLab />;
      case 'lab-riemann':
        return <RiemannLab />;
      case 'lab-direcciones':
        return <DirectionFieldLab />;
      case 'lab-libre':
        return <FreeLab />;
      case 'quizzes':
        return <QuizArena onAddXP={handleAddXP} />;
      case 'love-notes':
        return <LoveNotesView userXP={userXP} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1c] text-[#e9d5ff] font-inter relative">
      <div className="bg-particles" />

      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
        userName={userName}
        loveNotesCount={unlockedLoveNotes}
      />

      <div className="lg:pl-[280px] min-h-screen flex flex-col relative z-10">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenCustomModal={() => setIsCustomModalOpen(true)}
          xpPoints={userXP}
          isLofiPlaying={isLofiPlaying}
          onToggleLofi={toggleLofi}
          onSearch={() => {}}
        />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      <CustomizationModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        currentName={userName}
        onSaveName={setUserName}
      />
    </div>
  );
};
