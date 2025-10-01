import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamHero from '@/components/sections/TeamHero';
import NahedRachad from '@/components/sections/NahedRachad';
import TeamSlider from '@/components/sections/TeamSlider';

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <TeamHero />
        <NahedRachad />
        <TeamSlider />
      </main>
      <Footer />
    </>
  );
}