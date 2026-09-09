import type { Metadata } from 'next';
import QuizRunner from '@/components/questionnaire/QuizRunner';
import '@/components/questionnaire/questionnaire.css';

export const metadata: Metadata = {
  title: 'Questionnaire Profil — Reset Club™',
  description:
    "Cinq minutes pour comprendre comment votre corps fonctionne aujourd'hui : circulation, récupération, énergie, digestion. Un outil d'orientation bien-être, jamais un diagnostic.",
  // Parcours personnel : aucune raison d'être indexé.
  robots: { index: false, follow: false },
};

export default function QuestionnaireProfilPage() {
  return (
    <main className="rc-quiz bg-white">
      <QuizRunner />
    </main>
  );
}
