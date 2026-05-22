import type { Metadata, Viewport } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Poppins,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/wedding-data";

const { groom, bride } = wedding.couple;
const inviteTitle = `${groom} & ${bride} — Wedding Invitation`;

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: inviteTitle,
  description: `You are cordially invited to celebrate the union of ${groom} & ${bride}.`,
  openGraph: {
    title: inviteTitle,
    description: `Join ${groom} & ${bride} in celebrating our special day.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${cormorant.variable} ${poppins.variable} ${devanagari.variable}`}
    >
      <body className="antialiased pb-[env(safe-area-inset-bottom)]">{children}</body>
    </html>
  );
}
