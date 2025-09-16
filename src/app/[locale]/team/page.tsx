import { useTranslations } from 'next-intl';

export default function TeamPage() {
  const t = useTranslations('TeamPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}