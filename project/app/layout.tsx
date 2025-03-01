import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Giresun Rehberi - Karadeniz'in İncisi",
    template: "%s | Giresun Rehberi"
  },
  description: "Giresun'un doğal güzellikleri, tarihi yerleri, yaylaları, festivalleri ve yerel lezzetleri hakkında kapsamlı rehber.",
  keywords: ["Giresun", "Karadeniz", "turizm", "yayla", "fındık", "Giresun Kalesi", "Giresun Adası", "Kümbet Yaylası"],
  authors: [{ name: "Tolga Bayrak" }],
  creator: "Tolga Bayrak",
  publisher: "giresunhakkinda.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://giresunhakkinda.com",
    siteName: "Giresun Rehberi",
    title: "Giresun Rehberi - Karadeniz'in İncisi",
    description: "Giresun'un doğal güzellikleri, tarihi yerleri, yaylaları, festivalleri ve yerel lezzetleri hakkında kapsamlı rehber.",
    images: [
      {
        url: "/og-image.jpg", // Ana sayfa için bir Open Graph resmi eklemelisiniz
        width: 1200,
        height: 630,
        alt: "Giresun Manzarası",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giresun Rehberi - Karadeniz'in İncisi",
    description: "Giresun'un doğal güzellikleri, tarihi yerleri, yaylaları, festivalleri ve yerel lezzetleri hakkında kapsamlı rehber.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "IT-kb6k_dsHjrRgpNgJ5BhNbSoTvPWfCU2-ZtpkBUUg",
  },
  alternates: {
    canonical: "https://giresunhakkinda.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelGuide",
  "name": "Giresun Rehberi",
  "description": "Giresun'un kapsamlı turizm ve gezi rehberi",
  "publisher": {
    "@type": "Organization",
    "name": "giresunhakkinda.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://giresunhakkinda.com/logo.png"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
