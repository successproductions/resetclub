'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export interface Identite {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
}

const CHAMPS = [
  { cle: 'prenom', label: 'Prénom', type: 'text', autoComplete: 'given-name' },
  { cle: 'nom', label: 'Nom', type: 'text', autoComplete: 'family-name' },
  { cle: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { cle: 'telephone', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
] as const;

export default function IdentityStep({
  valeur,
  onSubmit,
}: {
  valeur: Identite;
  onSubmit: (i: Identite) => void;
}) {
  const [form, setForm] = useState<Identite>(valeur);
  const [touche, setTouche] = useState(false);

  const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const complet =
    form.prenom.trim().length > 1 && form.nom.trim().length > 1 && emailValide;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouche(true);
        if (complet) onSubmit(form);
      }}
      className="mx-auto w-full max-w-lg"
    >
      <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-[#51B1AA]">
        Avant de commencer
      </p>
      <h2 className="rc-h2-lead mt-4 text-center text-[#0D2623]">
        Faisons connaissance
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-center text-[14px] leading-relaxed text-[#7B7066]">
        Vos réponses restent confidentielles. Elles nous servent uniquement à préparer
        votre rendez-vous bilan.
      </p>

      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {CHAMPS.map((c) => {
          const v = form[c.cle];
          const enFaute =
            touche &&
            (c.cle === 'email'
              ? !emailValide
              : c.cle !== 'telephone' && v.trim().length <= 1);
          return (
            <label
              key={c.cle}
              className={c.cle === 'email' || c.cle === 'telephone' ? 'sm:col-span-2' : ''}
            >
              <span className="mb-2 block text-[13px] font-medium text-[#5B5148]">
                {c.label}
                {c.cle !== 'telephone' && <span className="ml-1 text-[#51B1AA]">*</span>}
              </span>
              <input
                type={c.type}
                value={v}
                autoComplete={c.autoComplete}
                onChange={(e) => setForm({ ...form, [c.cle]: e.target.value })}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0D2623] outline-none transition-colors duration-200 placeholder:text-[#B8AEA4] focus:border-[#51B1AA] focus:ring-4 focus:ring-[#51B1AA]/12 ${
                  enFaute ? 'border-[#C26D4C]' : 'border-[#E7DFD6]'
                }`}
                placeholder={c.cle === 'telephone' ? '+212 6 …' : ''}
              />
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        disabled={touche && !complet}
        className="group mt-9 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0D2623] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#1A4D47] disabled:cursor-not-allowed disabled:opacity-45"
      >
        Démarrer le questionnaire
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </form>
  );
}
