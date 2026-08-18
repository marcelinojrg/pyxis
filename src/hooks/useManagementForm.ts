'use client';

import { useForm, type FieldValues, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

export const useManagementForm = <T extends FieldValues>(
  schema: z.ZodType<T>,
  defaultValues?: UseFormProps<T>['defaultValues']
) => {
  const methods = useForm<T>({
    resolver: zodResolver(
      schema as unknown as Parameters<typeof zodResolver>[0]
    ) as unknown as UseFormProps<T>['resolver'],
    defaultValues,
  });

  const resetToDefaults = (vals: Partial<T>) => {
    methods.reset(vals as T);
  };

  return { ...methods, resetToDefaults };
};
