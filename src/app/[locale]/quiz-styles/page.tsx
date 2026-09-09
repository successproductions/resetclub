import type { Metadata } from 'next';
import StylePreview from '@/components/questionnaire/variants/StylePreview';
import '@/components/questionnaire/questionnaire.css';

/**
 * Page de comparaison des variantes de mise en page du questionnaire.
 *
 * TEMPORAIRE — sert uniquement à arbitrer entre les styles d'accueil et de
 * restitution. À supprimer, avec le dossier `variants/`, une fois le choix
 * arrêté. Non indexée : ce n'est pas une page publique.
 */
export const metadata: Metadata = {
  title: 'Styles du questionnaire — interne',
  robots: { index: false, follow: false },
};

export default function QuizStyles() {
  return <StylePreview />;
}
