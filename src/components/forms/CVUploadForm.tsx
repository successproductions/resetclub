'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import SubmitButton from '@/components/ui/SubmitButton';

export default function CVUploadForm() {
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
    <div className=" p-8  ">
      <div className="text-center">
        <div className="mb-6">
          {/* <div className="w-20 h-20 bg-gradient-to-br from-[#ccbaa8] to-[#b8a695] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div> */}
          <h3 className="text-3xl md:text-3xl text-[#524029] mb-3 font-graphik font-normal">
            {t('upload.title')}
          </h3>
          <p className="text-[#524029] mb-6 text-lg md:text-xl font-graphik leading-relaxed">
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
            className="inline-block px-6 md:px-12 py-6 bg-white border-2 border-dashed border-[#524029] cursor-pointer hover:bg-[#ccbaa8]/5 hover:border-[#ccbaa8] transition-all duration-300 shadow-sm"
          >
            <div className="text-center">
              {/* <svg className="w-16 h-16 text-[#c26d4c] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg> */}
              <p className="text-[#524029] font-normal font-graphik text-lg mb-2">
                {selectedFile ? selectedFile.name : t('upload.dragText')}
              </p>
              {/* <p className="text-sm text-[#524029] font-graphik">{t('upload.fileTypes')}</p> */}
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

        {/* Upload Button */}
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
  );
}