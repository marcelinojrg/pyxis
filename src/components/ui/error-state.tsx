import * as React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from './button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Terjadi Kesalahan',
  description = 'Gagal memuat data. Silakan coba beberapa saat lagi.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-red-100 bg-red-50/50',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-error mb-4 shadow-sm">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h4 className="text-lg font-bold font-heading text-neutral-900 mb-1">{title}</h4>
      <p className="text-sm text-neutral-600 max-w-sm mb-6 leading-relaxed">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Coba Lagi
        </Button>
      )}
    </div>
  );
}
