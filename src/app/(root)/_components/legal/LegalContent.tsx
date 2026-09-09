'use client';

import { useState, type FC } from 'react';
import { ShieldCheck, FileText, Cookie } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SanitizedHtml } from '@/components/Common/SanitizedHtml';

type LegalDocument = {
  slug: string;
  title: string;
  content: string;
};

const LEGAL_TABS = [
  { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
  { id: 'terms', label: 'Terms of Service', icon: FileText },
  { id: 'cookies', label: 'Cookie Policy', icon: Cookie },
];

export const LegalContent: FC<{ documents: LegalDocument[] }> = ({ documents }) => {
  const [activeTab, setActiveTab] = useState('privacy');
  const documentSlugs: Record<string, string> = {
    privacy: 'privacy-policy',
    terms: 'terms-of-service',
  };
  const activeDocument = documents.find((document) => document.slug === documentSlugs[activeTab]);

  return (
    <section className="border-y border-neutral-200 bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Tab Navigation Bar */}
          <div className="flex gap-2 overflow-x-auto border-b border-neutral-200 pb-2 lg:flex-col lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6">
            {LEGAL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 border-l-2 px-4 py-3 text-left text-sm font-semibold transition-all ${
                    isActive
                      ? 'border-[#1D4ED8] text-[#1D4ED8] bg-blue-50/50'
                      : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="prose prose-neutral max-w-none text-neutral-700 space-y-6 text-sm sm:text-base leading-relaxed">
            {activeTab !== 'cookies' &&
              (activeDocument ? (
                <div>
                  <h2 className="mb-4 text-2xl font-bold text-neutral-900">
                    {activeDocument.title}
                  </h2>
                  <SanitizedHtml content={activeDocument.content} />
                </div>
              ) : (
                <p className="text-neutral-500">This policy is not published yet.</p>
              ))}

            {activeTab === 'cookies' && (
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Cookie Policy</h2>
                <p>
                  Our website uses cookies and similar tracking technologies to improve your
                  browsing experience.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">
                  1. What are cookies?
                </h3>
                <p>
                  Cookies are small text files stored on your device when you visit our website.
                  They help us remember your preferences and analyze site traffic.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">2. Cookies we use</h3>
                <p>
                  We use Essential Cookies for security and basic navigation, as well as Analytics
                  Cookies to understand how visitors interact with our pages.
                </p>
                <h3 className="text-lg font-bold text-neutral-900 mt-6 mb-2">3. Cookie settings</h3>
                <p>
                  You can configure your browser to reject all or some cookies, but this may affect
                  the functionality of parts of our website.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
