import { ContactFormData, ContactFormErrors } from '@/types';

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateContactForm = (
  formData: ContactFormData,
  t: (key: string) => string
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = t('form.errors.required');
  }

  if (!formData.lastName.trim()) {
    errors.lastName = t('form.errors.required');
  }

  if (!formData.email.trim()) {
    errors.email = t('form.errors.required');
  } else if (!validateEmail(formData.email)) {
    errors.email = t('form.errors.invalidEmail');
  }

  if (!formData.phone.trim()) {
    errors.phone = t('form.errors.required');
  }

  if (!formData.subject.trim()) {
    errors.subject = t('form.errors.required');
  }

  if (!formData.message.trim()) {
    errors.message = t('form.errors.required');
  }

  return errors;
};