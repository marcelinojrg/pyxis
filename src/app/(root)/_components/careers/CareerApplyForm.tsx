'use client';

import { useState, type FC, type FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitCareerApplication } from '@/services/public/careers';

export interface CareerApplyFormProps {
  careerId: string;
  careerTitle: string;
}

export const CareerApplyForm: FC<CareerApplyFormProps> = ({ careerId, careerTitle }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await submitCareerApplication({
      careerId,
      fullName,
      email,
      phone,
      portfolioUrl,
      resumeUrl: '#placeholder-resume',
    });

    setLoading(false);
    if (res.success) {
      setStatus({
        type: 'success',
        message: 'Lamaran Anda berhasil dikirim! Tim HRD kami akan menghubungi Anda.',
      });
      setFullName('');
      setEmail('');
      setPhone('');
      setPortfolioUrl('');
    } else {
      setStatus({
        type: 'error',
        message: res.error || 'Gagal mengirimkan lamaran. Silakan coba lagi.',
      });
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
      <h3 className="text-lg font-bold text-neutral-900 mb-6">Formulir Lamaran</h3>

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-neutral-700 mb-1">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-md border border-neutral-300 bg-[#f8f9fb] px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#07358b]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            className="w-full rounded-md border border-neutral-300 bg-[#f8f9fb] px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#07358b]"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700 mb-1">
            Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08123456789"
            className="w-full rounded-md border border-neutral-300 bg-[#f8f9fb] px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#07358b]"
          />
        </div>

        <div>
          <label
            htmlFor="portfolioUrl"
            className="block text-xs font-semibold text-neutral-700 mb-1"
          >
            Link Tautan Portofolio / LinkedIn (Opsional)
          </label>
          <input
            id="portfolioUrl"
            name="portfolioUrl"
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-md border border-neutral-300 bg-[#f8f9fb] px-3.5 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#07358b]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-[#07358b] px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#052769] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Mengirimkan...' : 'Kirim Lamaran'}</span>
        </button>
      </form>
    </div>
  );
};
