'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { COUNTRIES } from '@/constants';
import SubmitButton from '@/components/ui/SubmitButton';

export default function CVUploadForm() {
  const t = useTranslations('RecrutonsPage');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+212');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{
    cvFile?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    position?: string;
    description?: string;
  }>({});

  // Validation regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{9,15}$/;
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setUploadStatus('error');
        return;
      }

      if (file.size > maxSize) {
        setUploadStatus('error');
        return;
      }

      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate CV file
    if (!selectedFile) {
      newErrors.cvFile = t('upload.errors.cvRequired');
    }

    // Validate full name
    if (!fullName.trim()) {
      newErrors.fullName = t('upload.errors.fullNameRequired');
    } else if (!nameRegex.test(fullName.trim())) {
      newErrors.fullName = t('upload.errors.fullNameInvalid');
    }

    // Validate phone
    if (!phone.trim()) {
      newErrors.phone = t('upload.errors.phoneRequired');
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = t('upload.errors.phoneInvalid');
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = t('upload.errors.emailRequired');
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = t('upload.errors.emailInvalid');
    }

    // Validate description
    if (!description.trim()) {
      newErrors.description = t('upload.errors.descriptionRequired');
    } else if (description.trim().length < 50) {
      newErrors.description = t('upload.errors.descriptionTooShort');
    }

    // Validate position
    if (!position) {
      newErrors.position = t('upload.errors.positionRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    if (!validateForm()) {
      return;
    }

    if (!selectedFile || !position) {
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus('success');
      // Reset form
      setSelectedFile(null);
      setFullName('');
      setCountryCode('+212');
      setPhone('');
      setEmail('');
      setPosition('');
      setDescription('');
      setErrors({});
    } catch {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-6 lg:px-0 py-8">
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-6">
        {/* 1. CV Upload */}
        <div>
          <label className="block text-gray-900 font-graphik text-lg mb-2">
            {t('upload.cvLabel')}
          </label>
          <input
            type="file"
            id="cv-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="cv-upload"
            className={`block w-full px-6 py-6 bg-white border-2 border-dashed cursor-pointer hover:bg-[#ccbaa8]/5 transition-all duration-300 shadow-sm text-center ${
              errors.cvFile ? 'border-red-500 hover:border-red-500' : 'border-[#524029] hover:border-[#ccbaa8]'
            }`}
          >
            <p className="text-gray-900 font-normal font-graphik text-lg">
              {selectedFile ? selectedFile.name : t('upload.dragText')}
            </p>
          </label>
          {errors.cvFile && (
            <p className="text-red-500 text-sm mt-1">{errors.cvFile}</p>
          )}
        </div>

        {/* 2-4. Personal Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 2. Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-900 font-graphik text-lg mb-2">
              {t('upload.fullName')}
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-4 py-3 border-2 focus:outline-none font-graphik text-gray-900 ${
                errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-[#524029] focus:border-[#ccbaa8]'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* 3. Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-gray-900 font-graphik text-lg mb-2">
              {t('upload.phone')}
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-3 border-2 border-[#524029] focus:border-[#ccbaa8] focus:outline-none font-graphik text-gray-900 bg-white"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`flex-1 px-4 py-3 border-2 focus:outline-none font-graphik text-gray-900 ${
                  errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#524029] focus:border-[#ccbaa8]'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* 4. Email */}
          <div>
            <label htmlFor="email" className="block text-gray-900 font-graphik text-lg mb-2">
              {t('upload.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border-2 focus:outline-none font-graphik text-gray-900 ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#524029] focus:border-[#ccbaa8]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* 5. Position Selection */}
        <div>
          <label htmlFor="position" className="block text-gray-900 font-graphik text-lg mb-2">
            {t('upload.positionLabel')}
          </label>
          <select
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={`w-full px-4 py-3 border-2 focus:outline-none font-graphik text-gray-900 bg-white ${
              errors.position ? 'border-red-500 focus:border-red-500' : 'border-[#524029] focus:border-[#ccbaa8]'
            }`}
          >
            <option value="">{t('upload.positionPlaceholder')}</option>
            <option value="director">{t('upload.positions.director')}</option>
            <option value="receptionist">{t('upload.positions.receptionist')}</option>
            <option value="sales">{t('upload.positions.sales')}</option>
            <option value="therapist">{t('upload.positions.therapist')}</option>
          </select>
          {errors.position && (
            <p className="text-red-500 text-sm mt-1">{errors.position}</p>
          )}
        </div>

        {/* 6. Description */}
        <div>
          <label htmlFor="description" className="block text-gray-900 font-graphik text-lg mb-2">
            {t('upload.descriptionLabel')}
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 border-2 focus:outline-none font-graphik text-gray-900 resize-none ${
              errors.description ? 'border-red-500 focus:border-red-500' : 'border-[#524029] focus:border-[#ccbaa8]'
            }`}
            placeholder={t('upload.descriptionPlaceholder')}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Upload Status */}
        {uploadStatus === 'success' && (
          <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
            <p className="text-green-800 font-medium">
              {t('upload.successMessage')}
            </p>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
            <p className="text-red-800">
              {t('upload.errorMessage')}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <SubmitButton
            type="submit"
            disabled={isUploading}
            variant="secondary"
            className="min-w-72 font-bold md:text-lg py-4 px-8"
          >
            {isUploading ? t('upload.uploading') : t('upload.buttonText')}
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}