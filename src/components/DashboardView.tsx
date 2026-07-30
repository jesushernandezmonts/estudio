import React, { useState } from 'react';
import { ViewType } from '../types';
import { magicShopMessages } from '../data/loveNotes';
import { PlayCircle, Sparkles, Users, RefreshCw, TrendingUp, Sigma, Activity, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardViewProps {
  userName: string;
  onSelectView: (view: ViewType) => void;
  diffDoneCount: number;
  intDoneCount: number;
  edoDoneCount: number;
  playChime: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  onSelectView,
  diffDoneCount,
  intDoneCount,
  edoDoneCount,
  playChime,
}) => {
  const [magicNoteIndex, setMagicNoteIndex] = useState(0);

  const handleRevealMagicNote = () => {
    const nextIdx = Math.floor(Math.random() * magicShopMessages.length);
    setMagicNoteIndex(nextIdx);
    playChime();
    confetti({ particleCount: 30, spread: 50 });
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#19112e] via-[#2d1b4e] to-[#19112e] border border-[#a855f7]/30 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#a855f7]/20 text-[#f472b6] border border-[#a855f7]/30">
            💜 Tu universo de cálculo & BTS
          </span>
          <h1 className="font-fredoka text-3xl md:text-5xl font-extrabold text-white leading-tight">
            ¡Hola, {userName}! 👋💜
          </h1>
          <p className="text-[#e9d5ff] text-base md:text-lg leading-relaxed">
            ¡Aprende Cálculo Diferencial, Integral y Ecuaciones Diferenciales explicado de la forma más fácil, bonita y accesible del mundo!
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onSelectView('diferencial')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:shadow-lg hover:shadow-[#a855f7]/50 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Comenzar Lecciones 💜</span>
            </button>
            <button
              onClick={() => onSelectView('lab-tangente')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-[#e9d5ff] bg-[#a855f7]/15 border border-[#a855f7]/30 hover:bg-[#a855f7]/25 transition-all"
            >
              <Sparkles className="w-5 h-5 text-[#f472b6]" />
              <span>Probar Laboratorios</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative z-10 w-full md:w-auto flex justify-center">
          <img
            src="assets/bts_banner.png"
            alt="BTS Math Banner"
            className="w-64 md:w-80 h-auto rounded-2xl object-cover border-2 border-[#a855f7]/40 shadow-2xl shadow-[#a855f7]/30 transform hover:scale-105 transition-transform"
          />
        </div>
      </div>

      {/* Daily Magic Shop Note */}
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f472b6]/20 text-[#f472b6] border border-[#f472b6]/30">
            🔮 Magic Shop Diaria
          </span>
          <span className="text-xs text-[#c084fc]">Mensaje de Amor & Motivación BTS</span>
        </div>
        <h3 className="font-fredoka text-xl font-bold text-white">Tu Mensaje de Hoy</h3>
        <p className="text-lg md:text-xl font-medium text-[#f472b6] italic leading-relaxed">
          "{magicShopMessages[magicNoteIndex]}"
        </p>
        <button
          onClick={handleRevealMagicNote}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#a855f7]/20 text-white hover:bg-[#a855f7]/30 border border-[#a855f7]/30 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Revelar Nuevo Mensaje 🔮</span>
        </button>
      </div>

      {/* BTS Member Guides */}
      <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-fredoka text-lg font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-[#a855f7]" />
          <span>Integrantes Guías del Universo Boraland</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            '🐨 RM (Líder & Teórico)',
            '🐹 Jin (Integrales Simétricas)',
            '🐱 Suga (Ritmo EDOs)',
            '🐿️ J-Hope (Energía Tangente)',
            '🐥 Jimin (Curvas Suaves)',
            '🐻 V (Campos de Arte)',
            '🐰 Jungkook (Rey de Quizzes)',
          ].map((member, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#a855f7]/15 text-[#e9d5ff] border border-[#a855f7]/30"
            >
              {member}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#a855f7]/20 text-[#a855f7]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">RM & Hobi: Diferencial</h4>
              <p className="text-xs text-[#c084fc]">{diffDoneCount} / 4 lecciones completadas</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0f0a1c] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#a855f7] to-[#f472b6] transition-all duration-500"
              style={{ width: `${(diffDoneCount / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#f472b6]/20 text-[#f472b6]">
              <Sigma className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Jin & Jimin: Integral</h4>
              <p className="text-xs text-[#c084fc]">{intDoneCount} / 4 lecciones completadas</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0f0a1c] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#f472b6] to-[#fbbf24] transition-all duration-500"
              style={{ width: `${(intDoneCount / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-[#19112e]/80 border border-[#a855f7]/30 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#38bdf8]/20 text-[#38bdf8]">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Suga & V: Ecuaciones EDO</h4>
              <p className="text-xs text-[#c084fc]">{edoDoneCount} / 4 lecciones completadas</p>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0f0a1c] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38bdf8] to-[#a855f7] transition-all duration-500"
              style={{ width: `${(edoDoneCount / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modules Showcase Grid */}
      <div className="space-y-4">
        <h2 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#a855f7]" />
          <span>Módulos de Cálculo BTS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => onSelectView('diferencial')}
            className="bg-[#19112e]/80 border border-[#a855f7]/30 hover:border-[#a855f7] rounded-3xl p-6 space-y-4 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between text-[#a855f7]">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs font-bold">Módulo 1 • RM & Hobi 🐨</span>
            </div>
            <h3 className="font-fredoka text-xl font-bold text-white">Cálculo Diferencial</h3>
            <p className="text-sm text-[#e9d5ff]/80">
              Aprende qué es el cambio instantáneo, velocidades exactas y límites con ejemplos súper sencillos.
            </p>
          </div>

          <div
            onClick={() => onSelectView('integral')}
            className="bg-[#19112e]/80 border border-[#f472b6]/30 hover:border-[#f472b6] rounded-3xl p-6 space-y-4 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between text-[#f472b6]">
              <Sigma className="w-6 h-6" />
              <span className="text-xs font-bold">Módulo 2 • Jin & Jimin 🐹</span>
            </div>
            <h3 className="font-fredoka text-xl font-bold text-white">Cálculo Integral</h3>
            <p className="text-sm text-[#e9d5ff]/80">
              Aprende a calcular el área acumulada debajo de cualquier curva como juntar piezas de un rompecabezas.
            </p>
          </div>

          <div
            onClick={() => onSelectView('edos')}
            className="bg-[#19112e]/80 border border-[#38bdf8]/30 hover:border-[#38bdf8] rounded-3xl p-6 space-y-4 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between text-[#38bdf8]">
              <Activity className="w-6 h-6" />
              <span className="text-xs font-bold">Módulo 3 • Suga & V 🐱</span>
            </div>
            <h3 className="font-fredoka text-xl font-bold text-white">Ecuaciones Diferenciales</h3>
            <p className="text-sm text-[#e9d5ff]/80">
              Descubre cómo predecir cambios reales (temperatura del café, poblaciones) con reglas y mapas visuales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
