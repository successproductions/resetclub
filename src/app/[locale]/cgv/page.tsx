'use client';

import { useTranslations } from 'next-intl';

export default function CGVPage() {
  const t = useTranslations('cgv');

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600">{t('lastUpdate')}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section1.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section1.content')}
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section2.title')}
            </h2>
            <p className="text-gray-700 mb-3">{t('section2.content')}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>{t('section2.list1')}</li>
              <li>{t('section2.list2')}</li>
              <li>{t('section2.list3')}</li>
              <li>{t('section2.list4')}</li>
              <li>{t('section2.list5')}</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section3.title')}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>{t('section3.content1')}</li>
              <li>{t('section3.content2')}</li>
              <li>{t('section3.content3')}</li>
              <li>{t('section3.content4')}</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section4.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section4.content')}
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section5.title')}
            </h2>
            <p className="text-gray-700 mb-3">{t('section5.content')}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>{t('section5.list1')}</li>
              <li>{t('section5.list2')}</li>
              <li>{t('section5.list3')}</li>
              <li>{t('section5.list4')}</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section6.title')}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>{t('section6.content1')}</li>
              <li>{t('section6.content2')}</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#51b1aa]">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section7.title')}
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>• {t('section7.content1')}</li>
              <li>• {t('section7.content2')}</li>
              <li>• {t('section7.content3')}</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section8.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section8.content')}
            </p>
          </section>

          {/* Section 9 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section9.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section9.content')}
            </p>
          </section>

          {/* Section 10 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section10.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section10.content')}
            </p>
          </section>

          {/* Section 11 */}
          <section className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#cbb9a7]">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section11.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section11.content')}
            </p>
          </section>

          {/* Section 12 */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl! font-semibold text-gray-900 mb-3">
              {t('section12.title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('section12.content')}
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2026 RESET Club™ - Tous droits réservés</p>
        </div>
      </div>
    </main>
  );
}
