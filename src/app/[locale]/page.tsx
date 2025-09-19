// import { useTranslations } from 'next-intl';
import Header from '../../components/layout/Header';
import Hero from '../../components/layout/Hero';
import LogoBanner from '../../components/layout/LogoBanner';
import WhyResetClub from '../../components/layout/WhyResetClub';
import BeforeAfter from '../../components/layout/BeforeAfter';
import Footer from '../../components/layout/Footer';

export default function HomePage() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBanner />
        <WhyResetClub />
        <BeforeAfter />
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </>
  );
}