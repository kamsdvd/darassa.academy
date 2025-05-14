import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card = React.memo<CardProps>(({
  children,
  className,
  padding = 'md',
  variant = 'elevated',
}) => {
  const baseStyles = 'rounded-lg';
  
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variantStyles = {
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-gray-200',
    filled: 'bg-gray-50',
  };

  const cardClasses = useMemo(() => {
    return twMerge(
      baseStyles,
      paddingStyles[padding],
      variantStyles[variant],
      className
    );
  }, [padding, variant, className]);

  return <div className={cardClasses}>{children}</div>;
});

Card.displayName = 'Card'; 