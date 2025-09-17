// import { useTranslations } from 'next-intl';
import Header from '../../components/layout/Header';
import Hero from '../../components/layout/Hero';
// import Footer from '../../components/layout/Footer';

export default function HomePage() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Additional sections can be added here */}
      </main>
      {/* <Footer /> */}
    </>
  );
}