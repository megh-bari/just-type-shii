import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-figtree",
})


const doto = localFont({
  src: "./fonts/Doto-Bold.ttf",
  weight: "900",
  variable: "--font-doto",
  fallback: ["Arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Just Type Shii - Minimalist Typing Experience",
  description:
    "A beautiful, distraction-free typing environment with customizable colors, fonts, and themes. Just start typing and let your thoughts flow.",
  keywords: [
    "typing",
    "minimalist",
    "writing",
    "text editor",
    "distraction free",
    "clean interface",
    "typing app",
    "writing tool",
    "focus mode",
    "zen writing",
    "simple editor",
    "typewriter",
    "markdown",
    "notes",
    "creative writing",
  ],
  authors: [{ name: "Megh Bari" }],
  creator: "Megh Bari",
  publisher: "Megh Bari",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://just-type-shii.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Just Type Shii - Minimalist Typing Experience",
    description:
      "A beautiful, distraction-free typing environment with customizable colors, fonts, and themes. Just start typing and let your thoughts flow.",
    url: "https://just-type-shii.vercel.app",
    siteName: "Just Type Shii",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Just Type Shii - Minimalist Typing Interface",
      },
      {
        url: "/banner.png",
        width: 1200,
        height: 1200,
        alt: "Just Type Shii Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Just Type Shii - Minimalist Typing Experience",
    description: "A beautiful, distraction-free typing environment. Just start typing and let your thoughts flow.",
    images: ["/banner.png"],
    creator: "@justtypeshii",
    site: "@justtypeshii",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "./favicon.svg"
  },
  applicationName: "Just Type Shii",
  generator: "Next.js",
  abstract: "Minimalist typing environment for distraction-free writing",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${doto.variable}`}>
      <body
        className={`font-figtree antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
