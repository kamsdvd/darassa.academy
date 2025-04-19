import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Transition from './Transition';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getTypeClasses = () => {
    const baseClasses = 'p-4 rounded-lg shadow-lg flex items-center justify-between';
    const typeClasses = {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
    };
    return `${baseClasses} ${typeClasses[type]}`;
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <Transition show={isVisible} type="slide" className="fixed top-4 right-4 z-50">
      <div className={getTypeClasses()}>
        <p className="mr-4">{message}</p>
        <button
          onClick={handleClose}
          className="p-1 hover:bg-opacity-20 hover:bg-black rounded-full transition-colors"
          aria-label="Fermer la notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </Transition>
  );
};

export default Notification; 