import { useTranslations } from 'next-intl';

export default function ContactInfo() {
  const t = useTranslations('ContactPage');

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
        <h2 className="text-3xl text-gray-900 mb-8">
          {t('info.title').toUpperCase()}
        </h2>

        <div className="space-y-6">
          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('info.address.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('info.address.value')}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('info.phone.title')}</h3>
              <a href={`tel:${t('info.phone.value')}`} className="text-gray-500 hover:text-amber-700 transition-colors">
                {t('info.phone.value')}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('info.email.title')}</h3>
              <a href={`mailto:${t('info.email.value')}`} className="text-gray-500 hover:text-amber-700 transition-colors">
                {t('info.email.value')}
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ccbaa8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{t('info.hours.title')}</h3>
              <div className="text-gray-600 space-y-1">
                <p>{t('info.hours.weekdays')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl shadow-lg p-2 md:p-4">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d874.4915847008423!2d-6.82753702406556!3d33.94756903071269!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda715395e27e587%3A0xde465c943b6a331b!2sSpamassage!5e1!3m2!1sfr!2sma!4v1758558857320!5m2!1sfr!2sma"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>
    </div>
  );
}