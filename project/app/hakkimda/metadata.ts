import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proje Hakkında - Giresun Tanıtım Projesi",
  description: "Giresun tanıtım projesinin amacı, hedefleri ve proje sahibi Tolga Bayrak hakkında detaylı bilgi. Yazılım geliştirici Tolga Bayrak'ın Giresun için hazırladığı kapsamlı şehir rehberi.",
  keywords: [
    "Tolga Bayrak",
    "Giresun tanıtım projesi",
    "Giresun rehberi",
    "Giresun hakkında",
    "Giresun şehir rehberi",
    "Karadeniz turizmi"
  ],
  openGraph: {
    title: "Proje Hakkında - Giresun Tanıtım Projesi",
    description: "Giresun tanıtım projesinin amacı, hedefleri ve proje sahibi Tolga Bayrak hakkında detaylı bilgi.",
    url: "https://giresunhakkinda.com/hakkimda",
    type: "profile",
    images: [
      {
        url: "/images/author.jpg", // Profilinizin bir fotoğrafını ekleyebilirsiniz
        width: 1200,
        height: 630,
        alt: "Tolga Bayrak - Proje Sahibi",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proje Hakkında - Giresun Tanıtım Projesi",
    description: "Giresun tanıtım projesinin amacı, hedefleri ve proje sahibi Tolga Bayrak hakkında detaylı bilgi.",
    images: ["/images/author.jpg"],
  },
  alternates: {
    canonical: "https://giresunhakkinda.com/hakkimda",
  },
  authors: [
    {
      name: "Tolga Bayrak",
      url: "https://tolgabayrak.com",
    }
  ],
  category: "about",
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  }
}; 