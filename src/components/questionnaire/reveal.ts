import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Révélation des sections du rapport au défilement. */
export function revelerSections() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set('.rc-sect', { opacity: 1, y: 0 });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray<HTMLElement>('.rc-sect').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
  });
  ScrollTrigger.refresh();
}
