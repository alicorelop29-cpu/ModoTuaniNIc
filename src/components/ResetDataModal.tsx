import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ResetDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetDataModal: React.FC<ResetDataModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#232925]/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#FFFDF8] border border-[#E0D5C3] rounded-3xl max-w-sm w-full p-6 sm:p-7 shadow-[0_20px_50px_rgba(35,41,37,0.2)] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#7C8781] hover:text-[#232925] bg-[#F4ECE0] hover:bg-[#EAE0CE] transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-13 h-13 rounded-2xl bg-[#B94D35]/10 border border-[#B94D35]/25 flex items-center justify-center text-[#B94D35] mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="font-display font-black text-xl text-[#232925]">
            ¿Borrar todos los datos?
          </h3>
          <p className="text-xs text-[#56605A] mt-2 leading-relaxed">
            Se eliminarán tus planes guardados, preferencias y sellos del Pasaporte de Aventuras en este dispositivo.
          </p>

          <div className="grid grid-cols-2 gap-3 w-full mt-6">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-[#F4ECE0] hover:bg-[#EAE0CE] text-[#3E4741] font-bold text-xs transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="py-2.5 px-4 rounded-xl bg-[#B94D35] hover:bg-[#9E3E28] text-white font-display font-black text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Sí, borrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
