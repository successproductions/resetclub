'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import SubmitButton from '../../../components/ui/SubmitButton';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('form.errors.required');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('form.errors.required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.errors.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('form.errors.invalidEmail');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('form.errors.required');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('form.errors.required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('form.errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      {/* Hero Section with Palm Background */}
      <div
        className="relative pt-32 pb-20 min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url('/PALMSBACKGROUND.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-2 md:px-6 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-6xl text-white mb-1 md:mb-6 drop-shadow-lg">
            {t('title').toUpperCase()}
          </h1>
          <p className="text-sm md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Form Section - Different Background */}
      <div className="bg-gray-50 py-4 md:py-16">
        <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl text-gray-900 mb-8">
              {t('form.title').toUpperCase()}
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">{t('form.successMessage')}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{t('form.errorMessage')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.firstName')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors placeholder:text-gray-300 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ '--tw-ring-color': '#ccbaa8' } as React.CSSProperties}
                    placeholder={t('form.firstNamePlaceholder')}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.lastName')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors placeholder:text-gray-300 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ '--tw-ring-color': '#ccbaa8' } as React.CSSProperties}
                    placeholder={t('form.lastNamePlaceholder')}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors placeholder:text-gray-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ '--tw-ring-color': '#ccbaa8' } as React.CSSProperties}
                  placeholder={t('form.emailPlaceholder')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors placeholder:text-gray-300 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ '--tw-ring-color': '#ccbaa8' } as React.CSSProperties}
                  placeholder={t('form.phonePlaceholder')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>


              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors resize-vertical placeholder:text-gray-300 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{ '--tw-ring-color': '#ccbaa8' } as React.CSSProperties}
                  placeholder={t('form.messagePlaceholder')}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
<div className='flex justify-center '>
{/* Submit Button */}
              <SubmitButton
                type="submit"
                variant="secondary"
                disabled={isSubmitting}
                className="min-w-64 center font-le-jour-serif text-sm lg:text-1xl md:text-lg whitespace-nowrap"
              >
                {isSubmitting ? t('form.sending') : t('form.submit')}
              </SubmitButton>
               
</div>
              
               
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
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
                      <p>{t('info.hours.saturday')}</p>
                      <p>{t('info.hours.sunday')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg p-2">
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
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
}