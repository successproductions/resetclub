// import { useTranslations } from 'next-intl';
import Header from '../../components/layout/Header';
import Hero from '../../components/layout/Hero';
import LogoBanner from '../../components/layout/LogoBanner';
import Footer from '../../components/layout/Footer';

export default function HomePage() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBanner />
        {/* Additional sections can be added here */}
      </main>
      <Footer />
    </>
  );
}