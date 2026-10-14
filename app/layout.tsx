import type { Metadata } from "next";
import { Abril_Fatface, Work_Sans, Noto_Serif_Khmer, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const abril = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const work = Work_Sans({
  variable: "--font-work",
  subsets: ["latin"],
  display: "swap",
});

const khmer = Noto_Serif_Khmer({
  variable: "--font-khmer-serif",
  subsets: ["khmer"],
  weight: ["400", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meng Heng",
  description:
    "Meng Heng is a backend developer in Phnom Penh. A portfolio pressed like a Golden Age Khmer LP: tracklist, liner notes and studio gear.",
  openGraph: {
    title: "Meng Heng · Building the Quiet Parts of the Web",
    description: "Backend developer in Phnom Penh. NestJS, Node.js, PostgreSQL, Docker.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${abril.variable} ${work.variable} ${khmer.variable} ${jetbrains.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
