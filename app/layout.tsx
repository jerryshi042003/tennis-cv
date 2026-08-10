import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://jerryshi042003.github.io"),
  title: "Racket-Sports CV Research Log",
  description: "A restrained literature review and complete experiment ledger for tennis and table-tennis computer vision.",
  openGraph: {
    title: "Racket-Sports CV Research Log",
    description: "70 experiments: evidence, failures, and the next input.",
    images: [`${basePath}/og-research-log.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Racket-Sports CV Research Log",
    description: "70 experiments: evidence, failures, and the next input.",
    images: [`${basePath}/og-research-log.png`],
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
