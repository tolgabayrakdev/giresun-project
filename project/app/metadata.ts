import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giresun Rehberi - Tarihi, Doğal ve Kültürel Güzellikleriyle Karadeniz'in İncisi",
  description: "Giresun'un tarihi mekanları, yaylaları, yerel lezzetleri ve kültürel değerleri hakkında kapsamlı rehber. Gezi planı oluşturun, en iyi restoranları keşfedin ve şehrin eşsiz güzelliklerini yaşayın.",
  keywords: [
    "Giresun rehberi",
    "Giresun gezilecek yerler",
    "Giresun tarihi",
    "Giresun yaylaları",
    "Giresun yerel lezzetler",
    "Giresun gezi planı",
    "Karadeniz turizmi",
    "Giresun kalesi",
    "Giresun fındık",
    "Giresun kültürü"
  ],
  openGraph: {
    title: "Giresun Rehberi - Karadeniz'in Saklı Cenneti",
    description: "Giresun'un tarihi, doğal güzellikleri ve yerel lezzetlerini keşfedin. Kişiselleştirilmiş gezi planları ve detaylı mekan rehberi ile Giresun'u yakından tanıyın.",
    url: "https://giresunhakkinda.com",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Giresun Manzarası",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Giresun Rehberi - Tarihi ve Doğal Güzellikleriyle",
    description: "Giresun'un eşsiz güzelliklerini keşfedin. Tarihi mekanlar, yaylalar, yerel lezzetler ve daha fazlası.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://giresunhakkinda.com",
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  }
}; 