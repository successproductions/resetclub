import { ContactFormData } from '@/types';

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
};