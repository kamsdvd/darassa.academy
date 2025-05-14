import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  options,
  leftIcon,
  rightIcon,
  fullWidth = false
}: FormFieldProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (options) {
          return (
            <Select
              {...field}
              label={label}
              options={options}
              error={error}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              fullWidth={fullWidth}
            />
          );
        }

        return (
          <Input
            {...field}
            type={type}
            label={label}
            placeholder={placeholder}
            error={error}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            fullWidth={fullWidth}
            required={required}
          />
        );
      }}
    />
  );
} 