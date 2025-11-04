// import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import LogoBanner from '@/components/sections/LogoBanner';
import IntroSection from '@/components/sections/IntroSection';
import WhyResetClub from '@/components/sections/WhyResetClub';
import KeyFigures from '@/components/sections/KeyFigures';
import ExperienceClient from '@/components/sections/ExperienceClient';
import NotreHistoireSection from '@/components/sections/NotreHistoireSection';
// import VideoCarousel from '@/components/sections/VideoCarousel';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Trustpilot from '@/components/sections/Trustpilot';
import PracticeComparison from '@/components/sections/PracticeComparison';
import TeamHero from '@/components/sections/TeamHero';
import Director from '@/components/sections/Director';
import TeamSlider from '@/components/sections/TeamSlider';

export default function HomePage() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBanner />
        {/* <PressBanner /> */}
            <PracticeComparison />
        <WhyResetClub />
                <BeforeAfter />
                {/* <VideoCarousel /> */}
        <KeyFigures />
        <ExperienceClient />
        <IntroSection />
        <NotreHistoireSection />
        <TeamHero />
        <Director />
        <TeamSlider />
        
        <Trustpilot />
      </main>
      <Footer />
    </>
  );
}