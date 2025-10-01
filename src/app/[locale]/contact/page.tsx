import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactHero from '@/components/sections/ContactHero';
import ContactForm from '@/components/forms/ContactForm';
import ContactInfo from '@/components/sections/ContactInfo';

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactHero />
      <div className="bg-gray-50 py-4 md:py-16 overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}