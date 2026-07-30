import { useState, useEffect, useCallback } from 'react';

export interface VoiceSettings {
  pitch?: number;
  rate?: number;
}

export const useTutorVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, settings: VoiceSettings = {}) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Clean HTML tags and markdown symbols from text before speaking
      const cleanText = text
        .replace(/<[^>]*>/g, '')
        .replace(/\*\*/g, '')
        .replace(/\$/g, '')
        .replace(/\\[a-zA-Z]+/g, ' ')
        .replace(/[\\_{}^]/g, ' ')
        .replace(/🔍|💜|✨|🐨|🐹|🐱|🐿️|🐥|🐻|🐰|📈|♾️|🌀|🧩|💡|⚡|🎯|🐮/g, '');

      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Pitch and rate
      utterance.pitch = settings.pitch ?? 1.0;
      utterance.rate = settings.rate ?? 1.0;

      // Find Spanish voice
      const voices = window.speechSynthesis.getVoices();
      const esVoice =
        voices.find((v) => v.lang.startsWith('es-MX')) ||
        voices.find((v) => v.lang.startsWith('es-ES')) ||
        voices.find((v) => v.lang.startsWith('es'));

      if (esVoice) {
        utterance.voice = esVoice;
      }
      utterance.lang = 'es-MX';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
  };
};
