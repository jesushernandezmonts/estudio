import { useState, useRef, useCallback } from 'react';

export function useLofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const playPianoNote = useCallback((freq: number, duration: number) => {
    if (!audioCtxRef.current) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch (e) {
      console.error('Audio synth error:', e);
    }
  }, []);

  const playChime = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    playPianoNote(523.25, 0.4);
    setTimeout(() => playPianoNote(659.25, 0.5), 100);
    setTimeout(() => playPianoNote(783.99, 0.6), 200);
  }, [playPianoNote]);

  const toggleLofi = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (isPlaying) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
      intervalRef.current = window.setInterval(() => {
        const note = notes[Math.floor(Math.random() * notes.length)];
        playPianoNote(note, 1.2);
      }, 800);
    }
  }, [isPlaying, playPianoNote]);

  return { isPlaying, toggleLofi, playChime };
}
