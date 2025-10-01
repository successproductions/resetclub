import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RecruitmentsHero from '@/components/sections/RecruitmentsHero';
import CVUploadForm from '@/components/forms/CVUploadForm';

export default function RecrutonsPage() {
  const t = useTranslations('RecrutonsPage');

  return (
    <>
      <Header />
      <RecruitmentsHero />

      <div className="bg-gray-50 py-4 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">

              {/* Intro Text */}
              <div className="mb-12 text-center">
                <p
                  className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8"
                  dangerouslySetInnerHTML={{__html: t('qualities.intro')}}
                />
                <div className="w-24 h-1 bg-[#ccbaa8] mx-auto"></div>
              </div>

              <CVUploadForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}