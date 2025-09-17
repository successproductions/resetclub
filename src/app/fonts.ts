import { Inter, Montserrat, Playfair_Display } from 'next/font/google';

// Main text font
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Headings font
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Luxury/elegant font for special titles
export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const fontVariables = `${inter.variable} ${montserrat.variable} ${playfair.variable}`;