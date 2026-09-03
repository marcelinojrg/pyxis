import { ContactInfo } from '@/app/(root)/_components/contact/ContactInfo';

export const AboutContact = () => {
  return (
    <section className="border-t border-neutral-200/70 bg-white py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mx-auto mb-14 max-w-3xl space-y-3 text-center">
          <h2
            data-home-reveal="heading"
            className="font-heading text-2xl font-bold text-neutral-900 sm:text-3xl md:text-4xl"
          >
            Lokasi Kami
          </h2>
          <p
            data-home-reveal="copy"
            className="text-sm leading-relaxed text-neutral-600 sm:text-base"
          >
            Kunjungi kantor kami atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <ContactInfo className="grid grid-cols-1 gap-6 md:grid-cols-2 md:space-y-0" />
        </div>
      </div>
    </section>
  );
};
