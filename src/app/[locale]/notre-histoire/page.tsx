import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NotreHistoireHero from '@/components/sections/NotreHistoireHero';
import NahedRachad from '@/components/sections/NahedRachad';

export default function NotreHistoirePage() {
  return (
    <>
      <Header />
      <NotreHistoireHero />
      <NahedRachad translationKey="NotreHistoirePage.nahed" />
      <Footer />
    </>
  );
}
