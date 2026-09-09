'use client';

import type { FC, FormEvent } from 'react';
import { Send } from 'lucide-react';

export const ContactForm: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const inputClass =
    'w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-2.5 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:ring-offset-2';
  const labelClass = 'text-sm font-semibold text-neutral-800';
  const selectClass = `${inputClass} cursor-pointer appearance-none`;

  return (
    <section
      aria-labelledby="contact-form-title"
      className="border border-neutral-300 bg-neutral-50/60 px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="border-b border-neutral-200 pb-6">
        <h2
          id="contact-form-title"
          className="text-3xl font-bold leading-tight tracking-[-0.025em] text-neutral-950 sm:text-4xl"
        >
          Tell us what you need.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-600">
          Share a few details so the Pyxis team can understand your operation and point you to the
          right conversation.
        </p>
      </div>

      <div
        id="contact-form-status"
        role="status"
        aria-live="polite"
        className="mt-6 border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-950"
      >
        <p className="font-semibold">Contact form is not live yet.</p>
        <p className="mt-1">
          Nothing will be sent from this page. For a quick response, use the office email or phone
          number listed below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-7"
        aria-describedby="contact-form-status"
      >
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
          <label htmlFor="fullName" className="space-y-3">
            <span className={labelClass}>
              Full name <span className="text-red-500">*</span>
            </span>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Your name"
              className={inputClass}
            />
          </label>
          <label htmlFor="company" className="space-y-3">
            <span className={labelClass}>
              Company or property <span className="text-red-500">*</span>
            </span>
            <input
              id="company"
              name="company"
              type="text"
              required
              placeholder="Your company"
              className={inputClass}
            />
          </label>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
          <label htmlFor="email" className="space-y-3">
            <span className={labelClass}>
              Email address <span className="text-red-500">*</span>
            </span>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className={inputClass}
            />
          </label>
          <label htmlFor="mobile" className="space-y-3">
            <span className={labelClass}>
              Phone or WhatsApp <span className="text-red-500">*</span>
            </span>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              required
              placeholder="+62 812 3456 7890"
              className={inputClass}
            />
          </label>
        </div>

        <label htmlFor="inquiryType" className="block space-y-3">
          <span className={labelClass}>
            What can we help with? <span className="text-red-500">*</span>
          </span>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="product-demo">Product demo</option>
            <option value="implementation">Implementation</option>
            <option value="partnership">Partnership</option>
            <option value="general">General question</option>
          </select>
        </label>

        <label htmlFor="message" className="block space-y-3">
          <span className={labelClass}>
            Message <span className="text-red-500">*</span>
          </span>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Tell us about your property, current challenge, or what you would like to explore."
            className={`${inputClass} resize-none`}
          />
        </label>
        <button
          type="submit"
          disabled
          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 border border-neutral-300 bg-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-500"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send message (not available yet)
        </button>
      </form>
    </section>
  );
};
