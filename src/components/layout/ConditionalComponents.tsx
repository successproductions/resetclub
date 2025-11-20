'use client';

import { usePathname } from 'next/navigation';
import WhatsAppButton from '../ui/WhatsAppButton';
import PopupOffer from '../ui/PopupOffer';
import NotificationWidget from '../ui/NotificationWidget';
import PopupOfferV2 from '../ui/PopupOfferV2';

export default function ConditionalComponents() {
  const pathname = usePathname();

  // Hide components on linktree, membership, payment, confirmation, and master-class pages
  const isLinktreePage = pathname.includes('/linktree');
  const isMembershipPage = pathname.includes('/membership');
  const isPaymentPage = pathname.includes('/payment');
  const isConfirmationPage = pathname.includes('/confirmation');
  const isMasterClassPage = pathname.includes('/master-class');

  if (isLinktreePage || isMembershipPage || isPaymentPage || isConfirmationPage || isMasterClassPage) {
    return null;
  }

  return (
    <>
      <WhatsAppButton phoneNumber="+212600000000" />
      {/* <PopupOffer /> */}
      <PopupOfferV2/>
      <NotificationWidget />
    </>
  );
}
