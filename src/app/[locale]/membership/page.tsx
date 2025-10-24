import MembershipHero from '@/components/sections/MembershipHero';
import CustomCursor from '@/components/ui/CustomCursor';

export default function MembershipPage() {
  return (
    <>
      <CustomCursor />
      <main className="membership-page">
        <MembershipHero />
        {/* Additional membership sections will go here */}
      </main>
    </>
  );
}
