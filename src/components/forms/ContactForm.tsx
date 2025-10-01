'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useContactForm } from '@/hooks';
import { COUNTRIES } from '@/constants';
import SubmitButton from '@/components/ui/SubmitButton';

export default function ContactForm() {
  const t = useTranslations('ContactPage');
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  return (
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
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#ccbaa8] text-gray-900 transition-colors placeholder:text-gray-300 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
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
              className={`w-full px-4 text-gray-900 py-3 border rounded-lg focus:outline-none focus:border-[#ccbaa8] transition-colors placeholder:text-gray-300 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
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
            className={`w-full px-4 text-gray-900 py-3 border rounded-lg focus:outline-none focus:border-[#ccbaa8] transition-colors placeholder:text-gray-300 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
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
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleInputChange}
              className={`px-3 py-3 border rounded-lg focus:outline-none focus:border-[#ccbaa8] transition-colors ${
                errors.countryCode ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.dialCode}>
                  {country.flag} {country.dialCode}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`flex-1 px-4 py-3 border text-gray-900  rounded-lg focus:outline-none focus:border-[#ccbaa8] transition-colors placeholder:text-gray-300 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('form.phonePlaceholder')}
            />
          </div>
          {(errors.countryCode || errors.phone) && (
            <p className="text-red-500 text-sm mt-1">{errors.countryCode || errors.phone}</p>
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
            className={`w-full px-4 py-3 border text-gray-900 rounded-lg focus:outline-none focus:border-[#ccbaa8] transition-colors resize-vertical placeholder:text-gray-300 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('form.messagePlaceholder')}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className='flex justify-center '>
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
  );
}