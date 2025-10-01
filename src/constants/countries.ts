export interface Country {
  code: string;
  flag: string;
  dialCode: string;
}

export const COUNTRIES: Country[] = [
  { code: 'MA', flag: '🇲🇦', dialCode: '+212' },
  { code: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { code: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { code: 'ES', flag: '🇪🇸', dialCode: '+34' },
  { code: 'IT', flag: '🇮🇹', dialCode: '+39' },
  { code: 'NL', flag: '🇳🇱', dialCode: '+31' },
  { code: 'BE', flag: '🇧🇪', dialCode: '+32' },
  { code: 'CH', flag: '🇨🇭', dialCode: '+41' },
];

export const DEFAULT_COUNTRY_CODE = '+212';