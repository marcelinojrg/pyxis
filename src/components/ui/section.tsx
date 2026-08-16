import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'muted' | 'dark' | 'primary';
}

export function Section({ className, variant = 'default', ...props }: SectionProps) {
  const bgVariants = {
    default: 'bg-white',
    muted: 'bg-neutral-100/70',
    dark: 'bg-neutral-900 text-white',
    primary: 'bg-primary text-white',
  };

  return <section className={cn('py-16 md:py-24', bgVariants[variant], className)} {...props} />;
}
