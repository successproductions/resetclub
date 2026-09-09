'use client';

import { useState } from 'react';
import type { ResultatComplet } from '@/types/questionnaire';
import IntroA from './IntroA';
import IntroB from './IntroB';
import IntroC from './IntroC';
import ResultA from './ResultA';
import ResultB from './ResultB';
import ResultC from './ResultC';

/** Résultat d'exemple : CORTISOL™ dominant, DRAIN™ ouvrant (règle de séquençage). */
const EXEMPLE: ResultatComplet = {
  eligibilite: 'validee',
  scores_bruts: { DRAIN: 10, CORTISOL: 21, METABOLIQUE: 7, DIGEST: 5 },
  modulateurs: { DRAIN: 1, CORTISOL: 2, METABOLIQUE: 0, DIGEST: 0 },
  scores_finaux: { DRAIN: 11, CORTISOL: 23, METABOLIQUE: 7, DIGEST: 5 },
  energie: 9,
  intensite_depart: 'moderee',
  classement: [
    { rang: 1, profil: 'CORTISOL', score: 23, statut: 'net' },
    { rang: 2, profil: 'DRAIN', score: 11, statut: 'modere' },
    { rang: 3, profil: 'METABOLIQUE', score: 7, statut: 'non_exprime' },
    { rang: 4, profil: 'DIGEST', score: 5, statut: 'non_exprime' },
  ],
  ecart_1_2: 12,
  dominance: 'nette',
  profil_ouvrant: 'DRAIN',
  sequencage_applique: true,
  fiabilite: 'elevee',
  incoherences: [],
  stack: ['Bisgly Mag', 'Quercetine+ Prophar', 'Krill Physalis'],
};

const VUES = [
  { cle: 'IA', label: 'Accueil A — Éditorial' },
  { cle: 'IB', label: 'Accueil B — Sombre, sans photo' },
  { cle: 'IC', label: 'Accueil C — Carte sur image floutée' },
  { cle: 'RA', label: 'Résultat A — Bandeau + colonne' },
  { cle: 'RB', label: 'Résultat B — Les 4 terrains' },
  { cle: 'RC', label: 'Résultat C — Colonne fixe' },
] as const;

export default function StylePreview() {
  const [vue, setVue] = useState<(typeof VUES)[number]['cle']>('IA');
  const rien = () => {};

  return (
    <main className="rc-quiz">
      <div className="sticky top-0 z-50 flex flex-wrap gap-2 border-b border-[#E7DFD6] bg-white/95 px-4 py-3 backdrop-blur">
        {VUES.map((v) => (
          <button
            key={v.cle}
            onClick={() => setVue(v.cle)}
            className={`rounded-full px-4 py-2 text-[12px] font-medium transition-colors ${
              vue === v.cle
                ? 'bg-[#0D2623] text-white'
                : 'bg-[#F5EFE8] text-[#5B5148] hover:bg-[#E7DFD6]'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      {vue === 'IA' && <IntroA onStart={rien} />}
      {vue === 'IB' && <IntroB onStart={rien} />}
      {vue === 'IC' && <IntroC onStart={rien} />}
      {vue === 'RA' && <ResultA resultat={EXEMPLE} prenom="Amina" />}
      {vue === 'RB' && <ResultB resultat={EXEMPLE} prenom="Amina" />}
      {vue === 'RC' && <ResultC resultat={EXEMPLE} prenom="Amina" />}
    </main>
  );
}
