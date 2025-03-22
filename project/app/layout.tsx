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
  description: "Giresun'un doğal güzellikleri, tarihi yerleri, yaylaları, festivalleri ve mutfağı hakkında kapsamlı bir rehber. Gezi planı oluşturun ve şehri keşfedin.",
  keywords: [
    "Giresun",
    "Karadeniz",
    "turizm",
    "yayla",
    "Fındık",
    "Giresun Kalesi",
    "Giresun Adası",
    "Kümbet Yaylası",
    "Yöresel yemekler",
    "Giresun mutfağı",
    "Karadeniz mutfağı",
    "yöresel sözcükler",
    "Giresun sözlüğü",
    "Fotoğraf albümü",
    "Gezi rehberi",
    "kültür turizmi"
  ],
  authors: [{ name: "Tolga Bayrak" }],
  creator: "Tolga Bayrak",
  publisher: "www.giresunhakkinda.com",
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
    url: "https://www.giresunhakkinda.com",
    siteName: "Giresun Rehberi",
    title: "Giresun Rehberi - Karadeniz'in İncisi",
    description: "Giresun'un doğal güzellikleri, tarihi yerleri, yaylaları, festivalleri, yerel lezzetleri ve yöresel sözlüğü hakkında kapsamlı rehber. Giresun mutfağının eşsiz tatları, şehrin kültürel mirası, fotoğraf albümü, gezi planı oluşturma ve daha fazlası için ziyaret edin.",
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
    description: "Giresun'un doğal güzellikleri, tarihi yerleri, yaylaları, festivalleri, yerel lezzetleri ve yöresel sözlüğü hakkında kapsamlı rehber. Giresun mutfağının eşsiz tatları, şehrin kültürel mirası, fotoğraf albümü, gezi planı oluşturma ve daha fazlası için ziyaret edin.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "hP1_YQgMg9sJlKVN5q5X1a-UWhlD20obxuia6sS6aAs",
  },
  alternates: {
    canonical: "https://www.giresunhakkinda.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelGuide",
  "name": "Giresun Rehberi",
  "description": "Giresun'un kapsamlı turizm ve gezi rehberi. Doğal güzellikler, tarihi yerler, yaylalar, festivaller, yerel lezzetler ve yöresel sözlük içerir.",
  "publisher": {
    "@type": "Organization",
    "name": "www.giresunhakkinda.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.giresunhakkinda.com/logo.png"
    }
  },
  "about": {
    "@type": "City",
    "name": "Giresun",
    "description": "Karadeniz'in incisi, fındığın başkenti Giresun şehri",
    "containsPlace": [
      {
        "@type": "TouristAttraction",
        "name": "Giresun Kalesi"
      },
      {
        "@type": "TouristAttraction",
        "name": "Giresun Adası"
      },
      {
        "@type": "TouristAttraction",
        "name": "Kümbet Yaylası"
      }
    ]
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
        <link rel="canonical" href="https://giresunhakkinda.com" />

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2712035708314627"
          crossOrigin="anonymous"></script>
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
