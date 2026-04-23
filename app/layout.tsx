import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Petrait — Your dog. As Napoleon.",
  description:
    "AI portraits of your pet in any style — royal, Renaissance, astronaut, wizard. Made for your wall.",
  openGraph: {
    title: "Petrait — Your dog. As Napoleon.",
    description:
      "AI portraits of your pet in any style — royal, Renaissance, astronaut, wizard. Made for your wall.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Petrait&accent=amber&category=Consumer%20AI",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Petrait&accent=amber&category=Consumer%20AI",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
