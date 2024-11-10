import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isRTL?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, isRTL = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 
              className={`text-xl font-semibold text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : ''} flex-grow`}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          <div 
            className={`mt-2 ${isRTL ? 'text-right' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 