import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export type AlertType = 'error' | 'success' | 'warning' | 'info';

interface AlertProps {
  children: React.ReactNode;
  type?: AlertType;
  title?: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  type = 'info',
  title,
  onClose,
  className = '',
}) => {
  const styles = {
    error: {
      container: 'bg-red-50 text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-400" />,
      title: 'text-red-800',
      close: 'text-red-500 hover:bg-red-100',
    },
    success: {
      container: 'bg-green-50 text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      title: 'text-green-800',
      close: 'text-green-500 hover:bg-green-100',
    },
    warning: {
      container: 'bg-yellow-50 text-yellow-800',
      icon: <AlertCircle className="h-5 w-5 text-yellow-400" />,
      title: 'text-yellow-800',
      close: 'text-yellow-500 hover:bg-yellow-100',
    },
    info: {
      container: 'bg-blue-50 text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-400" />,
      title: 'text-blue-800',
      close: 'text-blue-500 hover:bg-blue-100',
    },
  };

  return (
    <div className={`rounded-lg p-4 ${styles[type].container} ${className}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">{styles[type].icon}</div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles[type].title}`}>{title}</h3>
          )}
          <div className={`text-sm ${title ? 'mt-2' : ''}`}>{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 ${styles[type].close} focus:ring-2 focus:ring-offset-2 focus:ring-offset-${type}-50 focus:ring-${type}-600 focus:outline-none`}
            onClick={onClose}
            aria-label="Fermer"
          >
            <span className="sr-only">Fermer</span>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}; 