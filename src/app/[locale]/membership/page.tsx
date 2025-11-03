'use client';

import MembershipHero from '@/components/sections/MembershipHero';
import MembershipBenefits from '@/components/sections/MembershipBenefits';
import ClientExperience from '@/components/sections/ClientExperience';
import MembershipCTA from '@/components/sections/MembershipCTA';
import ChatbotButton from '@/components/ui/ChatbotButton';


export default function MembershipPage() {


  return (
    <>
      <main className="membership-page">
        <MembershipHero />
        <MembershipBenefits />
        <ClientExperience />
        <MembershipCTA />
      </main>
      <ChatbotButton />
    </>
  );
}
