import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Racket-Sports CV Research Log",
  description: "A restrained literature review and complete experiment ledger for tennis and table-tennis computer vision.",
  openGraph: {
    title: "Racket-Sports CV Research Log",
    description: "70 experiments: evidence, failures, and the next input.",
    images: ["/og-research-log.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Racket-Sports CV Research Log",
    description: "70 experiments: evidence, failures, and the next input.",
    images: ["/og-research-log.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
