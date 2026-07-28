'use client';

import { usePathname } from 'next/navigation';
import WhatsAppButton from '../ui/WhatsAppButton';

import NotificationWidget from '../ui/NotificationWidget';
import PopupOfferV2 from '../ui/PopupOfferV2';
// import PopupOffer from '../ui/PopupOffer';

export default function ConditionalComponents() {
  const pathname = usePathname();


  const isLinktreePage = pathname.includes('/linktree');
  const isMembershipPage = pathname.includes('/bilan-gratuit');
  const isPaymentPage = pathname.includes('/payment');
  const isConfirmationPage = pathname.includes('/confirmation');
  const isMasterClassPage = pathname.includes('/master-class');
  const isAcademyPage = pathname.includes('/academy');
  const isLegalPage = pathname.includes('/legal');
  const isCookiesPage = pathname.includes('/cookies');
  const isCGVPage = pathname.includes('/cgv');


  if (isLinktreePage || isMembershipPage || isPaymentPage || isConfirmationPage || isMasterClassPage || isAcademyPage || isLegalPage || isCookiesPage || isCGVPage) {
    return null;
  }

  return (
    <>
      <WhatsAppButton phoneNumber="+212689464650" />
      {/* <PopupOffer /> */}
      <PopupOfferV2 />
      <NotificationWidget />
    </>
  );
}
