import React, { useMemo, lazy, Suspense } from 'react';
import { twMerge } from 'tailwind-merge';

// Lazy load child components
const CardHeader = lazy(() => import('./CardHeader'));
const CardBody = lazy(() => import('./CardBody'));
const CardFooter = lazy(() => import('./CardFooter'));

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

  return (
    <div className={cardClasses}>
      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-8" />}>
        {children}
      </Suspense>
    </div>
  );
});

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader = React.memo<CardHeaderProps>(({
  children,
  className,
}) => {
  const headerClasses = useMemo(() => {
    return twMerge(
      'px-4 py-3 border-b border-gray-200',
      className
    );
  }, [className]);

  return (
    <div className={headerClasses}>
      {children}
    </div>
  );
});

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody = React.memo<CardBodyProps>(({
  children,
  className,
}) => {
  const bodyClasses = useMemo(() => {
    return twMerge(
      'px-4 py-3',
      className
    );
  }, [className]);

  return (
    <div className={bodyClasses}>
      {children}
    </div>
  );
});

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter = React.memo<CardFooterProps>(({
  children,
  className,
}) => {
  const footerClasses = useMemo(() => {
    return twMerge(
      'px-4 py-3 border-t border-gray-200',
      className
    );
  }, [className]);

  return (
    <div className={footerClasses}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter'; 