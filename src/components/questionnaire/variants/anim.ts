import type { RefObject } from 'react';
import gsap from 'gsap';

/**
 * Montée standard des variantes : `fromTo` avec état final explicite, pour
 * qu'aucun élément ne puisse rester bloqué à opacity 0.
 */
export function monterTimeline(root: RefObject<HTMLElement | null>, classe: string) {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      `.${classe}`,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
    );
  }, root);
  return () => ctx.revert();
}
