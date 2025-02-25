import { Metadata } from "next";
import GiresunSozluguClient from "./GiresunSozluguClient";
import dictionaryData from '@/data/dictionary.json';

export const metadata: Metadata = {
  title: "Giresun Sözlüğü - Yerel Kelimeler ve Anlamları | Giresun Ağzı",
  description: "Giresun'un yerel kelimelerini, deyimlerini ve anlamlarını keşfedin. Giresun ağzı sözlüğü ile kültürel mirası yaşatın. 1000+ kelime ve deyim içeren kapsamlı Karadeniz lehçesi rehberi.",
  keywords: [
    "Giresun sözlüğü",
    "Giresun ağzı",
    "Giresun yerel kelimeler",
    "Giresun deyimleri",
    "Karadeniz ağzı",
    "Giresun lehçesi",
    "Karadeniz şivesi",
    "Giresun yerel dil",
    "Giresun kültürü",
    "Giresun dil özellikleri"
  ],
  openGraph: {
    title: "Giresun Sözlüğü | Yerel Kelimeler ve Deyimler Rehberi",
    description: "Giresun'un zengin dil mirasını keşfedin. 1000+ kelime ve deyim içeren kapsamlı Giresun ağzı sözlüğü ile kültürel değerlerimizi yaşatalım.",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/images/giresun-sozlugu.jpg",
        width: 1200,
        height: 630,
        alt: "Giresun Sözlüğü - Yerel Kelimeler ve Deyimler"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Giresun Sözlüğü | Yerel Kelimeler ve Deyimler",
    description: "Giresun'un zengin dil mirasını keşfedin. Kapsamlı Giresun ağzı sözlüğü.",
    images: ["/images/giresun-sozlugu.jpg"]
  },
  alternates: {
    canonical: "https://giresun-rehberi.com/giresun-sozlugu"
  }
};

// Structured Data for Dictionary
const structuredData = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Giresun Sözlüğü",
  "description": "Giresun'un yerel kelimelerini ve deyimlerini içeren kapsamlı sözlük",
  "termDefined": dictionaryData.words.map(word => ({
    "@type": "DefinedTerm",
    "name": word.word,
    "description": word.meaning,
    "inDefinedTermSet": "Giresun Sözlüğü",
    "termCode": word.category,
    ...(word.example && { "example": word.example })
  })),
  "about": {
    "@type": "Place",
    "name": "Giresun",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Giresun",
      "addressCountry": "TR"
    }
  },
  "provider": {
    "@type": "Organization",
    "name": "Giresun Rehberi",
    "url": "https://giresun-rehberi.com"
  }
};

// FAQ Structured Data
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Giresun ağzı nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Giresun ağzı, Karadeniz bölgesinin Giresun ilinde konuşulan, kendine özgü kelime ve deyimleri olan yerel Türkçe lehçesidir."
      }
    },
    {
      "@type": "Question",
      "name": "Giresun'da en çok kullanılan yerel kelimeler nelerdir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Giresun'da günlük hayatta sıkça kullanılan yerel kelimeler arasında selamlaşma, akrabalık terimleri ve günlük yaşama dair özel ifadeler bulunmaktadır."
      }
    }
  ]
};

export default function GiresunDictionary() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <GiresunSozluguClient />
    </>
  );
}