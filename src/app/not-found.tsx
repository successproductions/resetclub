import Link from 'next/link';

/**
 * Unmatched URLs render here, outside the `[locale]` tree — so this file owns the
 * <html>/<body> tags that `app/layout.tsx` (a pass-through) no longer provides.
 */
export default function NotFound() {
  return (
    <html lang="fr">
      <body className="font-futura-family antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5efe8] px-6 text-center text-gray-950">
          <p className="font-graphik text-sm tracking-[0.3em]">404</p>
          <h1 className="mt-4 text-3xl font-normal md:text-4xl">
            Cette page n&apos;existe pas
          </h1>
          <p className="mt-3 font-graphik text-base text-gray-700">
            This page could not be found.
          </p>
          <Link
            href="/fr"
            className="mt-8 border-2 border-gray-950 px-6 py-3 font-graphik text-base font-semibold transition-colors duration-300 hover:bg-gray-950 hover:text-white"
          >
            Retour à l&apos;accueil
          </Link>
        </main>
      </body>
    </html>
  );
}
