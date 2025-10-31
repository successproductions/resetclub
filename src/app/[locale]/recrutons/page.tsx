import { useTranslations } from 'next-intl';
import Image from 'next/image';
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

      <div className="bg-white py-8 md:py-20 overflow-x-hidden">
        <div className="container mx-auto  md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Side - Text & Form */}
            <div className="order-2 lg:order-1">
              {/* Intro Text */}
              <div className="mb-8">
                <p
                  className="text-lg md:text-xl text-[#524029] text-center font-graphik leading-relaxed"
                  dangerouslySetInnerHTML={{__html: t('qualities.intro')}}
                />
              </div>

              {/* CV Upload Form */}
              <CVUploadForm />
            </div>

            {/* Right Side - Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
                <Image
                  src="/images/nahed_with_team.png"
                  alt="Nahed with Reset Club Team"
                  fill
                  className="object-cover  shadow-lg"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}