export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  countryCode?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export type SubmitStatus = 'idle' | 'success' | 'error';