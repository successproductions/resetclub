'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import SubmitButton from '../../../components/ui/SubmitButton';

export default function RecrutonsPage() {
  const t = useTranslations('RecrutonsPage');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      setUploadStatus('success');
      setSelectedFile(null);
    } catch {
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div
        className="relative pt-32 pb-20 min-h-[50vh] flex items-center justify-center"
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

      {/* Content Section */}
      <div className="bg-gray-50 py-4 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
              <h2 className="text-2xl md:text-4xl text-gray-900 mb-2 md:mb-8 text-center">
{t('mainTitle').toUpperCase()}
              </h2>

              {/* Qualities Section */}
              <div className="mb-12">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  <strong>{t('qualities.title')}</strong>
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.passionate')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.motivated')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.dynamic')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.teamwork')}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.communicator')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.flexible')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.creative')}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-[#ccbaa8] rounded-full mt-3"></div>
                      <p className="text-gray-700">{t('qualities.list.determined')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CV Upload Section */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-[#ccbaa8] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl text-gray-900 mb-2">{t('upload.title').toUpperCase()}</h3>
                    <p className="text-gray-600 mb-6">
{t('upload.subtitle')}
                    </p>
                  </div>

                  {/* File Upload */}
                  <div className="mb-6">
                    <input
                      type="file"
                      id="cv-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="cv-upload"
                      className="inline-block px-8 py-4 bg-white border-2 border-dashed border-[#ccbaa8] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-center">
                        <svg className="w-12 h-12 text-[#ccbaa8] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="text-[#ccbaa8] font-medium">
                          {selectedFile ? selectedFile.name : t('upload.dragText')}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{t('upload.fileTypes')}</p>
                      </div>
                    </label>
                  </div>

                  {/* Upload Status */}
                  {uploadStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800">{t('upload.successMessage')}</p>
                    </div>
                  )}

                  {uploadStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800">{t('upload.errorMessage')}</p>
                    </div>
                  )}

                  {/* Upload Button */}
                  {selectedFile && (
                    <SubmitButton
                      onClick={handleUpload}
                      disabled={isUploading}
                      variant="secondary"
                      className="min-w-64 font-le-jour-serif text-sm lg:text-1xl md:text-lg"
                    >
                      {isUploading ? t('upload.uploading') : t('upload.buttonText')}
                    </SubmitButton>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {t('contact.question')}{' '}
                  <a href={`mailto:${t('contact.email')}`} className="text-[#ccbaa8] hover:underline">
                    {t('contact.email')}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}