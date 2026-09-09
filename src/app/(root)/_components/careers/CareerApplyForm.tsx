'use client';

import { useState, type FC, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export interface CareerApplyFormProps {
  careerId: string;
  careerTitle: string;
}

export const CareerApplyForm: FC<CareerApplyFormProps> = ({ careerId, careerTitle }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({
      type: 'error',
      message:
        'Online applications are not available yet. Please send your CV and portfolio through the careers email.',
    });
  };

  return (
    <section
      aria-labelledby="career-application-title"
      className="border-t border-neutral-300 pt-6"
    >
      <div className="border-b border-neutral-200 pb-6">
        <h2
          id="career-application-title"
          className="text-2xl font-semibold tracking-tight text-neutral-950"
        >
          Share your interest
        </h2>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Complete the initial details for{' '}
          <span className="font-semibold text-neutral-900">{careerTitle}</span>.
        </p>
      </div>

      <div
        id="career-form-note"
        className="mt-6 flex gap-3 border border-amber-200 bg-amber-50/80 p-4 text-xs leading-6 text-amber-950"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
        <p>
          This form does not send your data or CV. Prepare your CV and portfolio; the application
          channel will be shared when the feature is available.
        </p>
      </div>

      {status && (
        <div
          className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-xs ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" aria-describedby="career-form-note">
        <input type="hidden" name="careerId" value={careerId} />
        <div>
          <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-neutral-800">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm placeholder:text-neutral-400 focus-visible:border-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-4"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-800">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm placeholder:text-neutral-400 focus-visible:border-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-4"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-neutral-800">
            Phone / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+62 812 3456 7890"
            className="w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm placeholder:text-neutral-400 focus-visible:border-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-4"
          />
        </div>

        <div>
          <label
            htmlFor="portfolioUrl"
            className="mb-2 block text-sm font-semibold text-neutral-800"
          >
            Portfolio / LinkedIn link (optional)
          </label>
          <input
            id="portfolioUrl"
            name="portfolioUrl"
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-3 text-sm placeholder:text-neutral-400 focus-visible:border-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-4"
          />
        </div>

        <button
          type="submit"
          disabled
          className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-500 disabled:opacity-100"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>Application submission is not available yet</span>
        </button>
      </form>
    </section>
  );
};
