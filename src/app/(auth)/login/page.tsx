'use client';

import { useState, useEffect } from 'react';
import type { Route } from 'next';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/lib/authClient';
import { Eye, EyeOff, Clock, AlertCircle } from 'lucide-react';

const SLIDES = [
  {
    image: '/assets/img/admin-login (1).jpg',
    title: 'Manage content and solutions',
    subtitle: 'Control product, service, and corporate content publishing in one platform.',
  },
  {
    image: '/assets/img/admin-login (2).jpg',
    title: 'Track insights and articles',
    subtitle:
      'Publish blog articles and current industry insights in a structured, professional workflow.',
  },
  {
    image: '/assets/img/admin-login (3).jpg',
    title: 'Opportunities and top talent',
    subtitle: "Manage recruitment and career information to reach tomorrow's best talent.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const isSessionExpired = searchParams.get('reason') === 'session_expired';

  const [activeSlide, setActiveSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: signInError } = await signIn.email({
        email,
        password,
      });

      if (signInError) {
        setError('Incorrect email or password. Please try again.');
        setIsLoading(false);
      } else {
        router.push(callbackUrl as Route);
        router.refresh();
      }
    } catch {
      setError('Something went wrong while signing in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-100">
      <div className="w-full max-w-[960px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl border border-slate-200/80 shadow-2xl bg-slate-900">
        {/* Left Panel — Photo Carousel Slider */}
        <div className="relative hidden lg:flex flex-col justify-between p-8 overflow-hidden min-h-[580px]">
          {/* Background Images with Fade Transition */}
          {SLIDES.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
              style={{ transitionProperty: 'opacity, transform' }}
            >
              <Image
                src={slide.image}
                alt={`Pyxis Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}

          {/* Dark Gradients for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 z-10" />
          <div className="absolute inset-0 bg-slate-950/20 z-10" />

          {/* Top: Pyxis Brand Title */}
          <div className="relative z-20 flex items-center">
            <span className="text-xl font-bold tracking-tight text-white font-heading">Pyxis</span>
          </div>

          {/* Bottom: Dynamic Tagline + Slide Indicator Dots */}
          <div className="relative z-20">
            <div className="min-h-[90px]">
              <h2 className="text-2xl font-bold leading-tight text-white transition-all duration-500 font-heading">
                {SLIDES[activeSlide].title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 transition-all duration-500">
                {SLIDES[activeSlide].subtitle}
              </p>
            </div>

            {/* Slide Indicator Dots */}
            <div className="mt-6 flex items-center gap-2">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel — Login Form */}
        <div className="flex flex-col justify-center bg-white p-8 sm:p-10 lg:p-12">
          {/* Mobile Brand Header */}
          <div className="mb-6 lg:hidden">
            <span className="text-xl font-bold tracking-tight text-slate-900 font-heading">
              Pyxis
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 font-heading">
              Sign in to the dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Use an authorized administrator account to continue.
            </p>
          </div>

          {/* Session expired banner */}
          {isSessionExpired && !error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-sm text-amber-800">
                Your session expired after 2 hours of inactivity. Please sign in again.
              </p>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50"
                placeholder="admin@pyxis.co.id"
                required
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900/10 disabled:opacity-50"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:text-slate-700 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Verifying...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="mt-8 text-center text-xs text-slate-400">
            Access is limited to authorized administrators.
            <br />© {new Date().getFullYear()} PT. Pyxis Ultimate Solution
          </p>
        </div>
      </div>
    </section>
  );
}
