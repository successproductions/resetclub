import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ResetClub™️ - Holistic & Biohacking Center",
  description: "Hackez votre corps. Révélez votre potentiel.",
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
  return children;
}