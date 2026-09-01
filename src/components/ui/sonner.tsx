'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'light' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      duration={2000}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
          zIndex: 9999,
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'rounded-lg border px-4 py-3 shadow-lg',
          title: 'font-semibold',
          description: 'text-current/85',
          success: '!border-emerald-600 !bg-emerald-600 !text-white',
          error: '!border-red-600 !bg-red-600 !text-white',
          warning: '!border-amber-500 !bg-amber-500 !text-white',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
