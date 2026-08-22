'use client';

import { useState, type FC, type FormEvent } from 'react';
import { Send } from 'lucide-react';

export const ContactForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // ponytail: client-side acknowledgement until leads DB model connected
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-10 border border-neutral-200/70 shadow-xs">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">Kirim Pesan</h1>
      <p className="text-sm sm:text-base text-neutral-500 mb-8">
        Isi formulir di bawah ini dan representatif kami akan segera menghubungi Anda.
      </p>

      {isSubmitted ? (
        <div className="p-6 rounded-xl bg-green-50 border border-green-200 text-center space-y-2">
          <h4 className="text-base font-bold text-green-800">Pesan Berhasil Terkirim!</h4>
          <p className="text-sm text-green-700">
            Terima kasih telah menghubungi kami. Tim kami akan segera merespons pesan Anda.
          </p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-4 py-2 bg-white text-green-800 text-sm font-semibold rounded-lg border border-green-300 hover:bg-green-100 transition-colors cursor-pointer"
          >
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-neutral-700 mb-1.5"
              >
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
              <label
                htmlFor="mobile"
                className="block text-xs font-semibold text-neutral-700 mb-1.5"
              >
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
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-neutral-700 mb-1.5"
            >
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
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#0B1E48] hover:bg-[#081534] text-white font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
