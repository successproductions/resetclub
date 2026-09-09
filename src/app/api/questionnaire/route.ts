import { NextRequest, NextResponse } from 'next/server';
import { evaluerProfil, ITEMS_ELIGIBILITE, ITEMS_SCORES } from '@/lib/questionnaire/engine';
import type {
  QuestionnaireInput,
  Resultat,
  ResultatComplet,
} from '@/types/questionnaire';
import { estAOrienter, estComplet } from '@/types/questionnaire';

interface Identite {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
}

/**
 * Le client affiche un résultat calculé dans le navigateur pour la fluidité,
 * mais la ligne qui part vers la feuille est toujours recalculée ici : c'est
 * cette exécution-là qui fait foi.
 */
function valider(entree: unknown): entree is QuestionnaireInput {
  if (!entree || typeof entree !== 'object') return false;
  const e = entree as QuestionnaireInput;
  if (!e.contexte || !e.eligibilite || !e.reponses || !e.arbitrage) return false;
  if (ITEMS_SCORES.some((k) => typeof e.reponses[k] !== 'number')) return false;
  if (ITEMS_ELIGIBILITE.some((k) => typeof e.eligibilite[k] !== 'boolean')) return false;
  return true;
}

/** Aplatit le résultat en colonnes lisibles dans la feuille QUIZ. */
function ligneFeuille(identite: Identite, entree: QuestionnaireInput, r: Resultat) {
  const complet = estComplet(r) ? (r as ResultatComplet) : null;
  const scores = complet?.scores_finaux ?? ('scores' in r ? r.scores : null);

  return {
    formType: 'quiz',
    timestamp: entree.date_soumission,
    clientId: entree.client_id,
    firstName: identite.prenom,
    lastName: identite.nom,
    email: identite.email,
    phone: identite.telephone,
    age: entree.contexte.A1_age,
    eligibilite: r.eligibilite,
    motifs: estAOrienter(r) ? r.motifs.join(', ') : '',
    scoreDrain: scores?.DRAIN ?? '',
    scoreCortisol: scores?.CORTISOL ?? '',
    scoreMetabolique: scores?.METABOLIQUE ?? '',
    scoreDigest: scores?.DIGEST ?? '',
    classement:
      complet?.classement.map((c) => `${c.rang}. ${c.profil} (${c.score})`).join(' · ') ?? '',
    ecart: complet?.ecart_1_2 ?? '',
    dominance: complet?.dominance ?? '',
    profilOuvrant: complet?.profil_ouvrant ?? '',
    sequencageApplique: complet?.sequencage_applique ? 'Oui' : '',
    energie: 'energie' in r ? r.energie : '',
    intensite: complet?.intensite_depart ?? '',
    fiabilite: 'fiabilite' in r ? r.fiabilite : '',
    incoherences: complet?.incoherences.join(', ') ?? '',
    stack: complet?.stack.join(', ') ?? '',
    ar1: entree.arbitrage.AR1,
    ar2: entree.arbitrage.AR2,
    contexte: [
      `sommeil ${entree.contexte.A3_sommeil}`,
      `eau ${entree.contexte.A5_eau}`,
      `activité ${entree.contexte.A4_activite}`,
      `cycles ${entree.contexte.A2_cycles}`,
      `poids ${entree.contexte.A8_poids_12m}`,
      entree.contexte.A6_traitement ? 'traitement en cours' : '',
      entree.contexte.A7_complements ? 'compléments' : '',
      entree.contexte.A9_antibiotiques_6m ? 'antibiotiques < 6 mois' : '',
    ]
      .filter(Boolean)
      .join(' · '),
    reponses: JSON.stringify(entree.reponses),
  };
}

/**
 * Écrit la ligne dans l'onglet QUIZ de la feuille partagée, via le même endpoint
 * Apps Script que les autres formulaires. Renvoie false au lieu de lever : une
 * panne côté Sheets ne doit pas priver la cliente de sa restitution.
 */
async function enregistrerDansFeuille(payload: ReturnType<typeof ligneFeuille>) {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;
  if (!url) {
    console.error('Questionnaire : NEXT_PUBLIC_GOOGLE_SHEETS_URL absent');
    return false;
  }

  try {
    const reponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const resultat = await reponse.json();
    if (resultat.status !== 'success') {
      console.error('Questionnaire : Google Sheets a rejeté la ligne', resultat);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Questionnaire : appel Google Sheets en échec', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const corps = (await request.json()) as { identite?: Identite; entree?: unknown };

    if (!corps.identite?.email || !valider(corps.entree)) {
      return NextResponse.json({ error: 'Payload incomplet' }, { status: 400 });
    }

    const resultat = evaluerProfil(corps.entree);
    const enregistre = await enregistrerDansFeuille(
      ligneFeuille(corps.identite, corps.entree, resultat),
    );

    return NextResponse.json({ ok: true, enregistre, resultat });
  } catch (error) {
    console.error('Questionnaire : erreur serveur', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
