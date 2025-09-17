import { Inter, Poppins, Playfair_Display, Cormorant_Garamond } from 'next/font/google';

// Modern body text font - clean and readable
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Luxury body text font - sophisticated
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

// Luxury heading font - elegant and modern
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-playfair',
});

// Ultra-luxury heading font - sophisticated serif
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const fontVariables = `${inter.variable} ${poppins.variable} ${playfair.variable} ${cormorant.variable}`;