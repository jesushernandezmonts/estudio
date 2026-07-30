import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  onSaveName: (newName: string) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  currentName,
  onSaveName,
}) => {
  const [nameInput, setNameInput] = useState(currentName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onSaveName(nameInput.trim());
      confetti({ particleCount: 40, spread: 50 });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#19112e] border border-[#a855f7]/40 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#a855f7]/20 pb-4">
          <h3 className="font-fredoka text-xl font-bold text-white flex items-center gap-2">
            <span>Personalizar ARMY 💜</span>
          </h3>
          <button onClick={onClose} className="text-[#c084fc] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#e9d5ff] mb-2">
              Tu Nombre o Apodo ARMY:
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Ej. ARMY Estrella, Sofía, Jin Stan"
              className="w-full px-4 py-3 rounded-2xl bg-[#0f0a1c] border border-[#a855f7]/30 text-white placeholder-[#c084fc]/50 focus:outline-none focus:border-[#a855f7] transition-all"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#c084fc] hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#a855f7] to-[#9333ea] hover:shadow-lg hover:shadow-[#a855f7]/40 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Guardar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
