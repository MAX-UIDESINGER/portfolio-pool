
'use client';
import { FC } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ModalWarningProps {
  open: boolean;
  onClose: () => void;
}

const ModalWarning: FC<ModalWarningProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center relative">
        <ExclamationTriangleIcon className="w-14 h-14 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">¿Estás seguro?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Esta acción no se puede deshacer. Por favor, confirma tu decisión.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWarning;
