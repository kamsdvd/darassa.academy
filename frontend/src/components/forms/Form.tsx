import React from 'react';
import { useForm, UseFormProps, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>['defaultValues'];
  children: (methods: ReturnType<typeof useForm<T>>) => React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className = ''
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange'
  });

  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={className}
      noValidate
    >
      {children(methods)}
    </form>
  );
} 