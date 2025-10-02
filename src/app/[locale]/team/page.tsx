import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamHero from '@/components/sections/TeamHero';
import Director from '@/components/sections/Director';
import TeamSlider from '@/components/sections/TeamSlider';

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <TeamHero />
        <Director />
        <TeamSlider />
      </main>
      <Footer />
    </>
  );
}