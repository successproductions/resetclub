'use client';

import { usePathname } from 'next/navigation';
import WhatsAppButton from '../ui/WhatsAppButton';
import PopupOffer from '../ui/PopupOffer';
import NotificationWidget from '../ui/NotificationWidget';

export default function ConditionalComponents() {
  const pathname = usePathname();

  // Hide components on linktree and membership pages
  const isLinktreePage = pathname.includes('/linktree');
  const isMembershipPage = pathname.includes('/membership');

  if (isLinktreePage || isMembershipPage) {
    return null;
  }

  return (
    <>
      <WhatsAppButton phoneNumber="+212600000000" />
      {/* <PopupOffer /> */}
      <NotificationWidget />
    </>
  );
}
