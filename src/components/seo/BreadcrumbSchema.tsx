import { useLocale } from 'next-intl';
import { BUSINESS } from '@/constants/business';

export interface Crumb {
  /** Human-readable label shown in the SERP breadcrumb trail. */
  name: string;
  /** Path after the locale segment, e.g. `/contact`. */
  path: string;
}

interface BreadcrumbSchemaProps {
  /** Trail after "Accueil" / "Home", which is prepended automatically. */
  items: Crumb[];
}

/**
 * BreadcrumbList JSON-LD. Gives Google an explicit page hierarchy, which it uses
 * both for the breadcrumb trail in the SERP and as one of the signals behind
 * sitelinks. Rendered as a plain <script> so it lands in the server HTML.
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const locale = useLocale();
  const home: Crumb = { name: locale === 'fr' ? 'Accueil' : 'Home', path: '' };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [home, ...items].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${BUSINESS.url}/${locale}${crumb.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
