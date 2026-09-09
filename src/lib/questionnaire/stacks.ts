import type { Profil } from '@/types/questionnaire';

/**
 * Bloc 4 — table des stacks. Le stack sorti par le moteur est une proposition
 * soumise à la validation de la praticienne, jamais une prescription. Aucun
 * complément n'est recommandé si la fonction rénale n'est pas connue.
 */
export const STACKS: Record<Profil, string[]> = {
  DRAIN: ['Bisgly Mag', 'Quercetine+ Prophar', 'Krill Physalis'],
  CORTISOL: ['Bisgly Mag', 'Ashwagandha VITALL+', 'Krill Physalis'],
  METABOLIQUE: ['Berberis VITALL+', 'Krill Physalis', 'Bisgly Mag', 'Chrome Prophar'],
  DIGEST: ['Lactibiane Reference Pileje', 'Bisgly Mag', 'Krill Physalis'],
};
