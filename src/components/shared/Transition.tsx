import React, { useEffect, useState } from 'react';

interface TransitionProps {
  children: React.ReactNode;
  show: boolean;
  type?: 'fade' | 'slide' | 'scale';
  duration?: number;
  className?: string;
}

const Transition: React.FC<TransitionProps> = ({
  children,
  show,
  type = 'fade',
  duration = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-in-out';
    const typeClasses = {
      fade: 'opacity-0',
      slide: 'translate-y-4 opacity-0',
      scale: 'scale-95 opacity-0',
    };

    return `${baseClasses} ${typeClasses[type]} ${className}`;
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${getTransitionClasses()} ${
        show ? 'opacity-100 translate-y-0 scale-100' : ''
      }`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default Transition; 