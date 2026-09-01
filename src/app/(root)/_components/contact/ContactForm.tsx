'use client';

import type { FC, FormEvent } from 'react';
import { Send } from 'lucide-react';

export const ContactForm: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-neutral-200/70 shadow-xs">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Kirim Pesan</h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        Isi formulir di bawah ini dan representatif kami akan segera menghubungi Anda.
      </p>

      <div
        role="status"
        className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
      >
        Formulir kontak sedang dalam tahap persiapan dan belum mengirim data. Untuk respons cepat,
        silakan gunakan email atau nomor telepon pada bagian informasi kontak.
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" aria-describedby="contact-form-status">
        <span id="contact-form-status" className="sr-only">
          Formulir kontak belum aktif.
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-semibold text-neutral-700 mb-1.5"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-xs font-semibold text-neutral-700 mb-1.5"
            >
              Company / Hotel Name
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              placeholder="Grand Hotel & Resort"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-xs font-semibold text-neutral-700 mb-1.5">
              Mobile Number
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              required
              placeholder="+62 812 3456 7890"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Jelaskan kebutuhan operasional atau pertanyaan Anda..."
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-neutral-400 resize-none"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-300 px-7 py-3 text-sm font-semibold text-neutral-600 transition-all duration-200"
          >
            <span>Formulir Belum Aktif</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
