/**
 * Bloc 9 — recette du moteur de calcul. 8 cas de test à faire passer avant
 * toute mise en production, plus les vérifications de langage sur les copies
 * destinées à la cliente.
 *
 *   npx tsx scripts/test-questionnaire.ts
 */

import { evaluerProfil, ITEMS_SCORES } from '../src/lib/questionnaire/engine';
import { ITEMS_ELIGIBILITE } from '../src/lib/questionnaire/engine';
import * as copy from '../src/lib/questionnaire/copy';
import type {
  ItemEligibilite,
  ItemScore,
  QuestionnaireInput,
  Resultat,
  ResultatComplet,
  Valeur,
} from '../src/types/questionnaire';

let echecs = 0;

function verifie(nom: string, condition: boolean, detail = '') {
  if (condition) {
    console.log(`  \x1b[32m✓\x1b[0m ${nom}`);
  } else {
    echecs++;
    console.log(`  \x1b[31m✗\x1b[0m ${nom}${detail ? ` — ${detail}` : ''}`);
  }
}

const eligibiliteVierge = () =>
  Object.fromEntries(ITEMS_ELIGIBILITE.map((k) => [k, false])) as Record<
    ItemEligibilite,
    boolean
  >;

const reponses = (valeur: Valeur, surcharges: Partial<Record<ItemScore, Valeur>> = {}) =>
  ({
    ...Object.fromEntries(ITEMS_SCORES.map((k) => [k, valeur])),
    ...surcharges,
  }) as Record<ItemScore, Valeur>;

/** Contexte volontairement neutre : aucun modulateur déclenché. */
const contexteNeutre: QuestionnaireInput['contexte'] = {
  A1_age: '40-49',
  A2_cycles: 'reguliers',
  A3_sommeil: '7-8',
  A4_activite: '2-3_fois',
  A5_eau: 'plus_2L',
  A6_traitement: false,
  A7_complements: false,
  A8_poids_12m: 'stable',
  A9_antibiotiques_6m: false,
};

function entree(over: Partial<QuestionnaireInput> = {}): QuestionnaireInput {
  return {
    client_id: 'RC-TEST-0001',
    date_soumission: '2026-09-03T11:20:00+01:00',
    contexte: contexteNeutre,
    eligibilite: eligibiliteVierge(),
    reponses: reponses(1),
    arbitrage: { AR1: 'DRAIN', AR2: 'DRAIN' },
    donnees_centre: {
      tanita_disponible: false,
      masse_hydrique: null,
      masse_musculaire: null,
      graisse_viscerale: null,
      masse_grasse_pct: null,
    },
    ...over,
  };
}

const complet = (r: Resultat) => r as ResultatComplet;

// ─── CAS 1 ────────────────────────────────────────────────────────────────────
console.log('\nCas 1 — B3 = true, toutes les autres réponses normales');
{
  const r = evaluerProfil(
    entree({ eligibilite: { ...eligibiliteVierge(), B3: true }, reponses: reponses(2, { D1: 3 }) }),
  );
  verifie('sortie « à orienter »', r.eligibilite === 'a_orienter');
  verifie('motif B3 remonté', 'motifs' in r && r.motifs.join() === 'B3');
  verifie('aucun score calculé', 'scores' in r && r.scores === null);
  verifie('aucun profil affiché', 'classement' in r && r.classement === null);
}

// ─── CAS 2 ────────────────────────────────────────────────────────────────────
console.log('\nCas 2 — les 29 réponses scorées à 2');
{
  const r = evaluerProfil(entree({ reponses: reponses(2) }));
  verifie('fiabilité insuffisante', 'fiabilite' in r && r.fiabilite === 'insuffisante');
  verifie('aucun classement', 'classement' in r && r.classement === null);
  verifie(
    'message de reprise',
    'action' in r && r.action === 'reprendre_avec_praticienne',
  );
}

// ─── CAS 3 ────────────────────────────────────────────────────────────────────
console.log('\nCas 3 — les 29 réponses scorées à 0');
{
  const r = evaluerProfil(entree({ reponses: reponses(0) }));
  verifie('aucun profil dominant', 'profil_dominant' in r && r.profil_dominant === null);
  verifie('fiabilité non concluante', 'fiabilite' in r && r.fiabilite === 'non_concluante');
  verifie(
    'protocole général',
    'action' in r && r.action === 'protocole_general_et_entretien',
  );
}

// ─── CAS 4 ────────────────────────────────────────────────────────────────────
console.log('\nCas 4 — D1=3, D2=3, reste des D à 2, autres profils à 0');
{
  const r = complet(
    evaluerProfil(
      entree({
        reponses: reponses(0, { D1: 3, D2: 3, D3: 2, D4: 2, D5: 2, D6: 2 }),
      }),
    ),
  );
  verifie('DRAIN™ à 20 — pondération ×2 vérifiée', r.scores_finaux.DRAIN === 20,
    `obtenu ${r.scores_finaux?.DRAIN}`);
  verifie('dominance nette', r.dominance === 'nette');
  verifie('DRAIN™ ouvre le parcours', r.profil_ouvrant === 'DRAIN');
  verifie('statut « net »', r.classement[0].statut === 'net');
}

// ─── CAS 5 ────────────────────────────────────────────────────────────────────
console.log('\nCas 5 — quatre profils à 17, AR1 = DIGEST');
{
  // 17 = (3×2) + (3×2) + 2 + 1 + 1 + 1 sur chacun des quatre profils.
  const bloc = (p: string) =>
    ({ [`${p}1`]: 3, [`${p}2`]: 3, [`${p}3`]: 2, [`${p}4`]: 1, [`${p}5`]: 1, [`${p}6`]: 1 });
  const r = complet(
    evaluerProfil(
      entree({
        reponses: reponses(0, {
          ...bloc('D'), ...bloc('C'), ...bloc('M'), ...bloc('G'),
        } as Partial<Record<ItemScore, Valeur>>),
        arbitrage: { AR1: 'DIGEST', AR2: 'DIGEST' },
      }),
    ),
  );
  verifie('les quatre profils à 17',
    Object.values(r.scores_finaux).every((v) => v === 17),
    JSON.stringify(r.scores_finaux));
  verifie('DIGEST™ passe rang 1', r.classement[0].profil === 'DIGEST');
  verifie('alerte tendance — fiabilité à vérifier', r.fiabilite === 'a_verifier');
}

// ─── CAS 6 ────────────────────────────────────────────────────────────────────
console.log('\nCas 6 — CORTISOL™ rang 2 à 16, MÉTABOLIQUE™ rang 1 à 19');
{
  // METABOLIQUE 19 = 6+6+3+2+1+1 · CORTISOL 16 = 6+6+2+1+1+0
  // DRAIN et DIGEST restent bas pour éviter l'alerte de tendance.
  const r = complet(
    evaluerProfil(
      entree({
        reponses: reponses(0, {
          M1: 3, M2: 3, M3: 3, M4: 2, M5: 1, M6: 1,
          C1: 3, C2: 3, C3: 2, C4: 1, C5: 1, C6: 0,
        }),
      }),
    ),
  );
  verifie('MÉTABOLIQUE™ à 19', r.scores_finaux.METABOLIQUE === 19, `${r.scores_finaux.METABOLIQUE}`);
  verifie('CORTISOL™ à 16', r.scores_finaux.CORTISOL === 16, `${r.scores_finaux.CORTISOL}`);
  verifie('MÉTABOLIQUE™ reste rang 1', r.classement[0].profil === 'METABOLIQUE');
  verifie('CORTISOL™ ouvre le parcours', r.profil_ouvrant === 'CORTISOL');
  verifie('séquençage signalé', r.sequencage_applique === true);
}

// ─── CAS 7 ────────────────────────────────────────────────────────────────────
console.log('\nCas 7 — énergie = 14, MÉTABOLIQUE™ dominant');
{
  // DRAIN et CORTISOL doivent rester hors des deux premiers rangs, sinon la
  // règle de séquençage les ferait ouvrir à la place de MÉTABOLIQUE™.
  const r = complet(
    evaluerProfil(
      entree({
        reponses: reponses(0, {
          M1: 3, M2: 3, M3: 3, M4: 3, M5: 2, M6: 2,
          G1: 2, G2: 2, G3: 1, G4: 1, G5: 1, G6: 1,
          E1: 3, E2: 3, E3: 3, E4: 3, E5: 2,
        }),
      }),
    ),
  );
  verifie('énergie = 14', r.energie === 14, `${r.energie}`);
  verifie('intensité réduite', r.intensite_depart === 'reduite');
  verifie('MÉTABOLIQUE™ ouvre', r.profil_ouvrant === 'METABOLIQUE');
  verifie(
    'incohérence « ne pas intensifier » remontée',
    r.incoherences.includes('ne_pas_intensifier_malgre_profil_metabolique'),
    r.incoherences.join(),
  );
}

// ─── CAS 8 ────────────────────────────────────────────────────────────────────
console.log('\nCas 8 — sommeil < 5 h, eau < 1 L, aucune activité, antibiotiques oui');
{
  const r = complet(
    evaluerProfil(
      entree({
        contexte: {
          ...contexteNeutre,
          A3_sommeil: 'moins_de_5',
          A5_eau: 'moins_1L',
          A4_activite: 'aucune',
          A9_antibiotiques_6m: true,
        },
        reponses: reponses(1, { D1: 3, C1: 2 }),
      }),
    ),
  );
  verifie('CORTISOL™ +3', r.modulateurs.CORTISOL === 3, `${r.modulateurs.CORTISOL}`);
  verifie('DRAIN™ +2', r.modulateurs.DRAIN === 2, `${r.modulateurs.DRAIN}`);
  verifie('MÉTABOLIQUE™ +2', r.modulateurs.METABOLIQUE === 2, `${r.modulateurs.METABOLIQUE}`);
  verifie('DIGEST™ +1', r.modulateurs.DIGEST === 1, `${r.modulateurs.DIGEST}`);
  verifie(
    'modulateurs appliqués au bon profil',
    r.scores_finaux.CORTISOL === r.scores_bruts.CORTISOL + 3 &&
      r.scores_finaux.DIGEST === r.scores_bruts.DIGEST + 1,
  );
}

// ─── Plafond de modulation ────────────────────────────────────────────────────
console.log('\nContrôle complémentaire — plafond +4 par profil');
{
  const r = complet(
    evaluerProfil(
      entree({
        contexte: { ...contexteNeutre, A3_sommeil: 'moins_de_5', A5_eau: 'moins_1L' },
        reponses: reponses(1, { D1: 3 }),
      }),
    ),
  );
  verifie(
    'aucun profil ne dépasse +4',
    Object.entries(r.modulateurs).every(
      ([k, v]) => r.scores_finaux[k as keyof typeof r.scores_finaux] -
        r.scores_bruts[k as keyof typeof r.scores_bruts] <= 4 && v >= 0,
    ),
  );
  verifie('score plafonné à 24', Object.values(r.scores_finaux).every((v) => v <= 24));
}

// ─── Déterminisme ─────────────────────────────────────────────────────────────
console.log('\nContrôle complémentaire — déterminisme');
{
  const e = entree({ reponses: reponses(2, { D1: 3, C2: 1, M4: 0, G6: 3 }) });
  const a = JSON.stringify(evaluerProfil(e));
  const b = JSON.stringify(evaluerProfil(e));
  verifie('deux exécutions identiques produisent le même résultat', a === b);
}

// ─── Vérifications de langage (Bloc 9) ────────────────────────────────────────
console.log('\nVérifications de langage — sorties cliente');
{
  // La mention finale et le rappel de cadre contiennent « diagnostic » par
  // obligation réglementaire : ils sont exclus du contrôle des mots proscrits.
  const exclus = new Set([copy.MENTION_FINALE]);
  const textesCliente = Object.entries(copy)
    .filter(([k]) => k !== 'MOTS_PROSCRITS')
    .flatMap(([, v]) =>
      typeof v === 'string' ? [v] : Object.values(v as object).flat().filter((x) => typeof x === 'string'),
    )
    .filter((t): t is string => typeof t === 'string' && !exclus.has(t));

  for (const mot of copy.MOTS_PROSCRITS) {
    const fautif = textesCliente.find((t) => t.toLowerCase().includes(mot));
    verifie(`aucune occurrence de « ${mot} »`, fautif === undefined, fautif);
  }

  const affirmations = ['vous avez ', 'vous êtes ', 'confirmé', 'avéré'];
  for (const a of affirmations) {
    const fautif = textesCliente.find((t) => t.toLowerCase().includes(a));
    verifie(`aucune affirmation d'état « ${a.trim()} »`, fautif === undefined, fautif);
  }

  verifie(
    'la mention finale figure mot pour mot',
    copy.MENTION_FINALE ===
      "Ce questionnaire est un outil d'orientation bien-être, fondé sur vos réponses. Il ne constitue ni un diagnostic, ni un avis médical. Il ne remplace ni un bilan biologique, ni l'avis de votre médecin. Aucun traitement en cours ne doit être modifié ou interrompu sur la base de ce document.",
  );

  const chiffres = textesCliente.filter((t) => /\b\d+\s*(sur|\/)\s*\d+\b/.test(t));
  verifie('aucun score chiffré dans les sorties cliente', chiffres.length === 0, chiffres.join(' | '));
}

console.log(
  echecs === 0
    ? '\n\x1b[32mRecette complète : tous les contrôles passent.\x1b[0m\n'
    : `\n\x1b[31m${echecs} contrôle(s) en échec.\x1b[0m\n`,
);
process.exit(echecs === 0 ? 0 : 1);
