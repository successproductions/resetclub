'use client';

import { forwardRef } from 'react';

interface Props {
  label: string;
  description?: string;
  selectionne: boolean;
  onClick: () => void;
  /** Affiché à gauche : pastille de valeur, initiale, icône. */
  ornement?: React.ReactNode;
}

/**
 * Carte de réponse. Un seul style pour toutes les sections du questionnaire :
 * l'uniformité visuelle est ce qui rend l'échelle comparable d'un item à l'autre.
 */
const OptionCard = forwardRef<HTMLButtonElement, Props>(function OptionCard(
  { label, description, selectionne, onClick, ornement },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-pressed={selectionne}
      className={`rc-option group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
        selectionne
          ? 'border-[#51B1AA] bg-[#51B1AA]/[0.07] shadow-[0_6px_24px_-12px_rgba(81,177,170,0.55)]'
          : 'border-[#E7DFD6] bg-white hover:border-[#CBB9A7] hover:bg-[#FBF8F4]'
      }`}
    >
      {ornement && (
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors duration-200 ${
            selectionne
              ? 'bg-[#51B1AA] text-white'
              : 'bg-[#F5EFE8] text-[#7B7066] group-hover:bg-[#E7DFD6]'
          }`}
        >
          {ornement}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[15px] leading-snug sm:text-base ${
            selectionne ? 'font-medium text-[#0D2623]' : 'text-[#2A2A2A]'
          }`}
        >
          {label}
        </span>
        {description && (
          <span className="mt-1 block text-[13px] leading-snug text-[#7B7066]">
            {description}
          </span>
        )}
      </span>
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
          selectionne ? 'border-[#51B1AA] bg-[#51B1AA]' : 'border-[#D8CEC4] bg-transparent'
        }`}
      >
        {selectionne && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
            <path
              d="M1 4.2 3.5 6.7 9 1.2"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
});

export default OptionCard;
