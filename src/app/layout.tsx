import type { Metadata } from "next";
import './globals.css';
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.resetclub.ma'),
  title: {
    default: "ResetClub™️ - Holistic & Biohacking Center",
    template: "%s | ResetClub™️"
  },
  description: "Le premier centre premium de transformation holistique au Maroc. Coaching sportif, nutrition, biohacking et bien-être pour votre transformation complète.",
  keywords: [
    "ResetClub",
    "Holistic center Morocco",
    "Biohacking Maroc",
    "Coaching sportif Rabat",
    "Nutrition Maroc",
    "Transformation holistique",
    "Centre bien-être Rabat",
    "Fitness premium Morocco",
    "Bilan Reset",
    "Sport et nutrition"
  ],
  authors: [{ name: "ResetClub™️" }],
  creator: "ResetClub™️",
  publisher: "ResetClub™️",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/logograstab.png",
    apple: "/LOGO.png",
    shortcut: "/images/logograstab.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "https://www.resetclub.ma",
    siteName: "ResetClub™️",
    title: "ResetClub™️ - Holistic & Biohacking Center",
    description: "Le premier centre premium de transformation holistique au Maroc. Coaching sportif, nutrition, biohacking et bien-être.",
    images: [
      {
        url: "/LOGO.png",
        width: 1200,
        height: 630,
        alt: "ResetClub™️ - Holistic & Biohacking Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ResetClub™️ - Holistic & Biohacking Center",
    description: "Le premier centre premium de transformation holistique au Maroc.",
    images: ["/LOGO.png"],
    creator: "@resetclub",
    site: "@resetclub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "google-site-verification=PLACEHOLDER_CODE_HERE", // User verified via Cloudflare
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}