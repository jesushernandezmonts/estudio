import React, { useState } from 'react';
import { ViewType } from '../types';
import { BTSTutor } from '../data/btsTutors';
import { magicShopMessages } from '../data/loveNotes';
import { useTutorVoice } from '../hooks/useTutorVoice';
import { PlayCircle, Sparkles, Users, RefreshCw, TrendingUp, Sigma, Activity, Compass, MessageCircleHeart, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import btsBannerImg from '../assets/bts_banner.png';

interface DashboardViewProps {
  userName: string;
  selectedTutor: BTSTutor;
  onOpenTutorModal: () => void;
  onSelectView: (view: ViewType) => void;
  diffDoneCount: number;
  intDoneCount: number;
  edoDoneCount: number;
  playChime: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userName,
  selectedTutor,
  onOpenTutorModal,
  onSelectView,
  diffDoneCount,
  intDoneCount,
  edoDoneCount,
  playChime,
}) => {
  const [magicNoteIndex, setMagicNoteIndex] = useState(0);
  const { speak, stop, isSpeaking } = useTutorVoice();

  const handleSpeakTutor = (text: string) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text, { pitch: selectedTutor.pitch, rate: selectedTutor.rate });
    }
  };

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
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#a855f7]/20 text-[#f472b6] border border-[#a855f7]/30">
            <span>{selectedTutor.emoji}</span>
            <span>Tutor Oficial: {selectedTutor.stageName} • {selectedTutor.badge}</span>
          </span>
          <h1 className="font-fredoka text-3xl md:text-5xl font-extrabold text-white leading-tight">
            ¡Hola, {userName}! 👋💜
          </h1>
          <div className="flex items-center gap-3">
            <p className="text-[#e9d5ff] text-base md:text-lg leading-relaxed flex-1">
              "{selectedTutor.greeting}"
            </p>
            <button
              onClick={() => handleSpeakTutor(selectedTutor.greeting)}
              className={`p-3 rounded-2xl border transition-all shrink-0 ${
                isSpeaking
                  ? 'bg-[#f472b6] text-white border-[#f472b6] shadow-lg shadow-[#f472b6]/40 animate-pulse'
                  : 'bg-[#a855f7]/20 text-[#f472b6] border-[#a855f7]/40 hover:bg-[#a855f7]/30'
              }`}
              title={`Escuchar a ${selectedTutor.stageName} hablar 🔊`}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onSelectView('diferencial')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:shadow-lg hover:shadow-[#a855f7]/50 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Comenzar Lecciones 💜</span>
            </button>
            <button
              onClick={onOpenTutorModal}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-[#e9d5ff] bg-[#a855f7]/15 border border-[#a855f7]/30 hover:bg-[#a855f7]/25 transition-all"
            >
              <Sparkles className="w-5 h-5 text-[#f472b6]" />
              <span>Cambiar Tutor BTS {selectedTutor.emoji}</span>
            </button>
          </div>
        </div>

        {/* Hero Banner Image */}
        <div className="relative z-10 w-full md:w-auto flex justify-center">
          <div className="relative group cursor-pointer" onClick={onOpenTutorModal}>
            <img
              src={btsBannerImg}
              alt="BTS Math Banner"
              className="w-64 md:w-80 h-auto rounded-2xl object-cover border-2 border-[#a855f7]/40 shadow-2xl shadow-[#a855f7]/30 transform group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-sm">
              <span>Cambiar Tutor BTS 💜</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tutor Daily Motivation Card */}
      <div className="bg-gradient-to-r from-[#19112e] via-[#2d1b4e] to-[#19112e] border-2 border-[#f472b6]/40 rounded-3xl p-6 md:p-8 space-y-3 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#f472b6]/20 text-[#f472b6] border border-[#f472b6]/30">
            <MessageCircleHeart className="w-4 h-4" />
            <span>Consejo de Tu Tutor {selectedTutor.stageName} {selectedTutor.emoji}</span>
          </span>
          <button
            onClick={onOpenTutorModal}
            className="text-xs text-[#c084fc] hover:underline"
          >
            Cambiar Tutor
          </button>
        </div>
        <div className="flex items-start justify-between gap-4">
          <p className="text-xl md:text-2xl font-bold text-white font-fredoka leading-relaxed flex-1">
            "{selectedTutor.catchphrase}"
          </p>
          <button
            onClick={() => handleSpeakTutor(selectedTutor.catchphrase)}
            className={`p-3 rounded-2xl border transition-all shrink-0 ${
              isSpeaking
                ? 'bg-[#f472b6] text-white border-[#f472b6] shadow-lg shadow-[#f472b6]/40 animate-pulse'
                : 'bg-[#a855f7]/20 text-[#f472b6] border-[#a855f7]/40 hover:bg-[#a855f7]/30'
            }`}
            title={`Escuchar consejo de ${selectedTutor.stageName} 🔊`}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-sm text-[#e9d5ff]/80">
          ✨ {selectedTutor.description}
        </p>
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
        <div className="flex items-center justify-between">
          <h3 className="font-fredoka text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-[#a855f7]" />
            <span>Integrantes Guías del Universo Boraland</span>
          </h3>
          <span className="text-xs text-[#c084fc]">Haz click para elegir como tutor</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'rm', name: '🐨 RM (Líder & Teórico)' },
            { id: 'jin', name: '🐹 Jin (Integrales Simétricas)' },
            { id: 'suga', name: '🐱 Suga (Ritmo EDOs)' },
            { id: 'jhope', name: '🐿️ J-Hope (Energía Tangente)' },
            { id: 'jimin', name: '🐥 Jimin (Curvas Suaves)' },
            { id: 'v', name: '🐻 V (Campos de Arte)' },
            { id: 'jungkook', name: '🐰 Jungkook (Rey de Quizzes)' },
          ].map((m) => {
            const isCurrent = selectedTutor.id === m.id;
            return (
              <button
                key={m.id}
                onClick={onOpenTutorModal}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isCurrent
                    ? 'bg-[#f472b6]/30 text-white border-[#f472b6] font-bold shadow-md'
                    : 'bg-[#a855f7]/15 text-[#e9d5ff] border-[#a855f7]/30 hover:border-[#a855f7]/60'
                }`}
              >
                {m.name} {isCurrent && '✓ (Tu Tutor)'}
              </button>
            );
          })}
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
