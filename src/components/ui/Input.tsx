import React, { forwardRef, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, leftIcon, rightIcon, fullWidth = false, className, ...props }, ref) => {
      const baseStyles = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';
      const errorStyles = 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500';

      const inputClasses = useMemo(() => {
        return twMerge(
          baseStyles,
          error && errorStyles,
          leftIcon && 'pl-10',
          rightIcon && 'pr-10',
          fullWidth ? 'w-full' : '',
          className
        );
      }, [error, leftIcon, rightIcon, fullWidth, className]);

      return (
        <div className={fullWidth ? 'w-full' : ''}>
          {label && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
          )}
          <div className="relative">
            {leftIcon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {leftIcon}
              </div>
            )}
            <input
              ref={ref}
              className={inputClasses}
              {...props}
            />
            {rightIcon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

Input.displayName = 'Input'; 