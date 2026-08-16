import * as React from 'react';
import { cn } from '@/lib/utils';
import { FolderOpen } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'Belum ada data',
  description = 'Data akan muncul di sini setelah ditambahkan.',
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50/50',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 shadow-sm">
        {icon || <FolderOpen className="w-7 h-7" />}
      </div>
      <h4 className="text-lg font-bold font-heading text-neutral-900 mb-1">{title}</h4>
      <p className="text-sm text-neutral-500 max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
