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

      {/* Hero Section - Updated with Reset Club™ branding */}
      <div
        className="relative pt-32 pb-20 min-h-[28vh] flex items-center justify-center"
        style={{
          backgroundImage: `url('/PALMSBACKGROUND.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-2 pt-6 md:px-6 text-center relative z-10">
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-white mb-1 md:mb-6 drop-shadow-lg">
            {t('hero.title')}
          </h1>
          <p className="text-sm md:text-1xl text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 py-4 md:py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-lg   p-6 md:p-12">
              
              {/* Intro Text - Updated with copywriting style */}
              <div className="mb-12 text-center">
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8" dangerouslySetInnerHTML={{__html: t('qualities.intro')}} />

                <div className="w-24 h-1 bg-[#ccbaa8] mx-auto"></div>
              </div>



              {/* CV Upload Section - Enhanced */}
              <div className="bg-gradient-to-br from-[#ccbaa8]/10 to-[#ccbaa8]/5 rounded-xl p-8 border border-[#ccbaa8]/20">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#ccbaa8] to-[#b8a695] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl text-gray-900 mb-3 font-bold">
                      {t('upload.title')}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {t('upload.subtitle')}
                    </p>
                  </div>

                  {/* File Upload - Enhanced styling */}
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
                      className="inline-block px-12 py-6 bg-white border-2 border-dashed border-[#ccbaa8] rounded-xl cursor-pointer hover:bg-[#ccbaa8]/5 hover:border-[#ccbaa8] transition-all duration-300 shadow-sm"
                    >
                      <div className="text-center">
                        <svg className="w-16 h-16 text-[#ccbaa8] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="text-[#ccbaa8] font-semibold text-lg mb-2">
                          {selectedFile ? selectedFile.name : t('upload.dragText')}
                        </p>
                        <p className="text-sm text-gray-500">{t('upload.fileTypes')}</p>
                      </div>
                    </label>
                  </div>

                  {/* Upload Status */}
                  {uploadStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                      <p className="text-green-800 font-medium">
                        {t('upload.successMessage')}
                      </p>
                    </div>
                  )}

                  {uploadStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                      <p className="text-red-800">
                        {t('upload.errorMessage')}
                      </p>
                    </div>
                  )}

                  {/* Upload Button - Enhanced */}
                  {selectedFile && (
                    <div className="mt-8">
                      <SubmitButton
                        onClick={handleUpload}
                        disabled={isUploading}
                        variant="secondary"
                        className="min-w-72 font-bold text-lg py-4 px-8"
                      >
                        {isUploading ? t('upload.uploading') : t('upload.buttonText')}
                      </SubmitButton>
                    </div>
                  )}
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