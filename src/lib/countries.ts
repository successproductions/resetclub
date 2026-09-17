/** Indicatifs proposés dans les sélecteurs de téléphone, Maroc en tête. */
export const INDICATIFS = [
  { code: '+212', label: '🇲🇦 +212' },
  { code: '+33', label: '🇫🇷 +33' },
  { code: '+34', label: '🇪🇸 +34' },
  { code: '+32', label: '🇧🇪 +32' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+49', label: '🇩🇪 +49' },
  { code: '+39', label: '🇮🇹 +39' },
  { code: '+31', label: '🇳🇱 +31' },
  { code: '+41', label: '🇨🇭 +41' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+974', label: '🇶🇦 +974' },
  { code: '+213', label: '🇩🇿 +213' },
  { code: '+216', label: '🇹🇳 +216' },
  { code: '+221', label: '🇸🇳 +221' },
  { code: '+225', label: '🇨🇮 +225' },
  { code: '+86', label: '🇨🇳 +86' },
  { code: '+81', label: '🇯🇵 +81' },
  { code: '+61', label: '🇦🇺 +61' },
] as const;

export const INDICATIF_DEFAUT = '+212';

/**
 * Sépare un numéro stocké en entier (« +212 6 12 … ») en indicatif et numéro
 * national. Les indicatifs sont testés du plus long au plus court, sinon `+1`
 * capturerait `+212`.
 */
export function separerIndicatif(valeur: string): { indicatif: string; numero: string } {
  const texte = valeur.trim();
  const code = [...INDICATIFS]
    .map((i) => i.code)
    .sort((a, b) => b.length - a.length)
    .find((c) => texte.startsWith(c));

  if (!code) return { indicatif: INDICATIF_DEFAUT, numero: texte };
  return { indicatif: code, numero: texte.slice(code.length).trim() };
}
