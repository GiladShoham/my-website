import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface TooltipProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchorRef: React.RefObject<HTMLElement>;
}

const Tooltip: React.FC<TooltipProps> = ({ isOpen, onClose, children, anchorRef }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={tooltipRef}
      className="absolute z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[280px] max-w-[320px]"
      style={{
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '8px'
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        aria-label="Close tooltip"
      >
        <X size={16} />
      </button>
      {children}
    </div>
  );
};

export default Tooltip;
