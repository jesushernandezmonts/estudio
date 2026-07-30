import React from 'react';
import { ViewType } from '../types';
import { 
  Sparkles, 
  TrendingUp, 
  Sigma, 
  Activity, 
  LineChart, 
  BarChart2, 
  Compass, 
  Calculator, 
  Award, 
  Heart, 
  X 
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  userName: string;
  loveNotesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  isOpen,
  onCloseMobile,
  userName,
  loveNotesCount,
}) => {
  const handleNavClick = (view: ViewType) => {
    onSelectView(view);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-[#120b24] border-r border-[#a855f7]/20 flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#a855f7]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#a855f7] to-[#f472b6] flex items-center justify-center text-xl shadow-lg shadow-[#a855f7]/40">
              💜
            </div>
            <div>
              <h2 className="font-fredoka text-lg font-bold text-white flex items-center gap-1">
                Boraland Math <span className="text-sm">💜</span>
              </h2>
              <p className="text-xs text-[#c084fc]">BTS & Calculus Edition</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-[#c084fc] hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <div className="text-[11px] font-bold text-[#c084fc] tracking-wider mb-2 px-3">
              💜 MÓDULOS DE APRENDIZAJE
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white shadow-md shadow-[#a855f7]/30'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Inicio & Universo ARMY</span>
              </button>

              <button
                onClick={() => handleNavClick('diferencial')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'diferencial'
                    ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white shadow-md shadow-[#a855f7]/30'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#f472b6]" />
                  <span>RM & Hobi: Diferencial</span>
                </div>
                <span className="text-[10px] bg-[#f472b6]/20 text-[#f472b6] px-2 py-0.5 rounded-full border border-[#f472b6]/30">
                  📈
                </span>
              </button>

              <button
                onClick={() => handleNavClick('integral')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'integral'
                    ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white shadow-md shadow-[#a855f7]/30'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sigma className="w-4 h-4 text-[#f472b6]" />
                  <span>Jin & Jimin: Integral</span>
                </div>
                <span className="text-[10px] bg-[#f472b6]/20 text-[#f472b6] px-2 py-0.5 rounded-full border border-[#f472b6]/30">
                  ♾️
                </span>
              </button>

              <button
                onClick={() => handleNavClick('edos')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'edos'
                    ? 'bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white shadow-md shadow-[#a855f7]/30'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-[#38bdf8]" />
                  <span>Suga & V: Ecuaciones EDO</span>
                </div>
                <span className="text-[10px] bg-[#38bdf8]/20 text-[#38bdf8] px-2 py-0.5 rounded-full border border-[#38bdf8]/30">
                  🌀
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#c084fc] tracking-wider mb-2 px-3">
              🎨 LABORATORIOS INTERACTIVOS
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('lab-tangente')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'lab-tangente'
                    ? 'bg-[#a855f7]/25 text-white border border-[#a855f7]/40'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <LineChart className="w-4 h-4 text-[#a855f7]" />
                <span>Lab: Recta Tangente</span>
              </button>

              <button
                onClick={() => handleNavClick('lab-riemann')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'lab-riemann'
                    ? 'bg-[#a855f7]/25 text-white border border-[#a855f7]/40'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <BarChart2 className="w-4 h-4 text-[#f472b6]" />
                <span>Lab: Sumas de Riemann</span>
              </button>

              <button
                onClick={() => handleNavClick('lab-direcciones')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'lab-direcciones'
                    ? 'bg-[#a855f7]/25 text-white border border-[#a855f7]/40'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <Compass className="w-4 h-4 text-[#38bdf8]" />
                <span>Lab: Campos de Direcciones</span>
              </button>

              <button
                onClick={() => handleNavClick('lab-libre')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'lab-libre'
                    ? 'bg-[#a855f7]/25 text-white border border-[#a855f7]/40'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <Calculator className="w-4 h-4 text-[#fbbf24]" />
                <span>Lab Libre de Funciones 🧮</span>
              </button>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#c084fc] tracking-wider mb-2 px-3">
              🎵 QUIZZES Y CARTAS BTS
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('quizzes')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'quizzes'
                    ? 'bg-[#a855f7]/25 text-white border border-[#a855f7]/40'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <Award className="w-4 h-4 text-[#fbbf24]" />
                <span>Desafíos Jungkook Arena</span>
              </button>

              <button
                onClick={() => handleNavClick('love-notes')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'love-notes'
                    ? 'bg-[#a855f7]/25 text-white border border-[#a855f7]/40'
                    : 'text-[#e9d5ff] hover:bg-[#a855f7]/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-[#f472b6]" />
                  <span>Cartas Borahae 💜</span>
                </div>
                <span className="text-xs bg-[#f472b6]/20 text-[#f472b6] font-bold px-2 py-0.5 rounded-full border border-[#f472b6]/30">
                  {loveNotesCount} / 5
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer User Card */}
        <div className="p-4 border-t border-[#a855f7]/20">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/30">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f472b6] to-[#a855f7] flex items-center justify-center text-xl shadow-md">
              👑
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-white truncate">{userName}</div>
              <div className="text-xs text-[#c084fc] truncate">Nivel: Mikrokosmos 🌌</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
