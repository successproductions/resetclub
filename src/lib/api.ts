import { ContactFormData } from '@/types';

export const submitContactForm = async (formData: ContactFormData): Promise<void> => {
  // Simulate API call - replace with actual API endpoint
  await new Promise(resolve => setTimeout(resolve, 2000));

  // TODO: Replace with actual API call
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _data = formData;

  // const response = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
  //
  // if (!response.ok) {
  //   throw new Error('Failed to submit form');
  // }
};