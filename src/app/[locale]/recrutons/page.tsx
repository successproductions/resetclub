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

      <div className="bg-gray-50 py-4 md:py-16 overflow-x-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 lg:p-12">

              {/* Intro Text */}
              <div className="mb-12 text-center">
                <p
                  className="text-sm md:text-lg text-gray-800 leading-relaxed max-w-3xl mx-auto mb-8"
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