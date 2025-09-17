import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "ResetClub™️ - Holistic & Biohacking Center",
  description: "Le premier centre premium de transformation holistique au Maroc.",
  icons: {
    icon: "/LOGO.png",
    apple: "/LOGO.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}