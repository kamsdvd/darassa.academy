import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, icon, ...props }, ref) => {
    const baseStyles = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6';
    const validStyles = 'ring-gray-300 placeholder:text-gray-400 focus:ring-primary-600';
    const errorStyles = 'ring-red-300 placeholder:text-red-300 focus:ring-red-500';
    const disabledStyles = 'bg-gray-50 text-gray-500 cursor-not-allowed';
    
    const inputStyles = `
      ${baseStyles}
      ${error ? errorStyles : validStyles}
      ${props.disabled ? disabledStyles : ''}
      ${icon ? 'pl-10' : 'pl-3'}
      ${className}
    `.trim();

    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={inputStyles}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
); 