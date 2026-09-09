'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowLeft, MessageCircle, RotateCcw } from 'lucide-react';
import type { ErrorStateProps } from '@/interfaces/error';

const errorCopy: Record<number, { title: string; description: string }> = {
  401: {
    title: 'Your session has expired',
    description: 'Please sign in again to continue.',
  },
  403: {
    title: 'Access restricted',
    description: 'You do not have permission to open this page.',
  },
  404: {
    title: 'Page not found',
    description: 'The address you opened may have moved or is no longer available.',
  },
  503: {
    title: 'Service maintenance',
    description: 'We are making a few adjustments. Please try again shortly.',
  },
};

export default function ErrorState({ code, error, onRetry }: ErrorStateProps) {
  const content = errorCopy[code] ?? {
    title: 'Internal error',
    description: 'The Pyxis system is temporarily unavailable. Our team has received the report.',
  };
  const showDetails = process.env.NODE_ENV !== 'production' && error?.message;

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:items-center lg:gap-16">
          <section className="max-w-2xl">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-slate-600 transition hover:text-[#0A1222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to home
            </Link>

            <p className="mt-10 text-7xl font-extrabold leading-none tracking-[-0.04em] text-[#0A1222] sm:text-8xl">
              {code}
            </p>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">{content.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {onRetry ? (
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0A1222] px-6 text-sm font-bold text-white transition hover:bg-[#0B1E48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Try again
                </button>
              ) : null}
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-sm font-bold text-[#0A1222] transition hover:border-[#0A1222] hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Contact the Pyxis team
              </Link>
            </div>

            {showDetails ? (
              <details className="mt-8 max-w-xl rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <summary className="cursor-pointer font-semibold text-slate-900">
                  Development details
                </summary>
                <p className="mt-3 break-words font-mono text-xs leading-6 text-amber-800">
                  {error.message}
                </p>
              </details>
            ) : null}
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex size-14 items-center justify-center rounded-xl bg-[#F59E0B]/15 text-[#F59E0B]">
              <AlertTriangle className="size-7" aria-hidden="true" />
            </div>
            <p className="mt-10 text-sm font-semibold uppercase tracking-[0.16em] text-[#F59E0B]">
              Pyxis Ultimate Solution
            </p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-[#0A1222]">
              We are handling it.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              You can return home or reload the page and pick up where you left off.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
