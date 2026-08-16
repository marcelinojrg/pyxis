import * as React from 'react';
import { cn } from '@/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  eyebrow?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

export function Heading({
  children,
  level = 2,
  eyebrow,
  description,
  align = 'left',
  className,
  ...props
}: HeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align];

  const headingStyles = {
    1: 'text-3xl sm:text-4xl md:text-5xl font-bold font-heading leading-tight tracking-tight',
    2: 'text-2xl sm:text-3xl md:text-4xl font-bold font-heading leading-tight',
    3: 'text-xl sm:text-2xl font-semibold font-heading leading-snug',
    4: 'text-lg sm:text-xl font-semibold font-heading',
  }[level];

  const Tag = `h${level}` as React.ElementType;

  return (
    <div className={cn('space-y-3', alignClass, className)}>
      {eyebrow && (
        <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-3 py-1 rounded-full">
          {eyebrow}
        </span>
      )}
      <Tag className={cn(headingStyles, 'text-neutral-900')} {...props}>
        {children}
      </Tag>
      {description && (
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
