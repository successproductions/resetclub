import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { fontVariables } from '../fonts';
import ConditionalComponents from '../../components/layout/ConditionalComponents';
import StructuredData from '../../components/seo/StructuredData';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'fr')) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={fontVariables}>
      <body className="font-futura-family antialiased overflow-x-hidden">
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>
          {children}
          <ConditionalComponents />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}