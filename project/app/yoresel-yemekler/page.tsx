import LocalFoodClient from './LocalFoodClient';
import foodData from '@/data/food.json';

export const metadata = {
  title: "Giresun Yöresel Yemekleri - Karadeniz Mutfağının Lezzetleri",
  description: "Giresun'un geleneksel yemekleri, tarifleri ve yöresel lezzetleri. Karadeniz mutfağının eşsiz tatlarını keşfedin.",
  keywords: ["Giresun yemekleri", "Karadeniz mutfağı", "yöresel lezzetler", "Giresun mutfağı", "geleneksel tarifler", "Karadeniz yöresel yemekleri", "Giresun mutfak kültürü"],
  openGraph: {
    title: "Giresun Yöresel Yemekleri | Karadeniz'in Eşsiz Lezzetleri",
    description: "Giresun'un geleneksel mutfağını keşfedin. Yöresel yemek tarifleri, malzemeler ve yapılışları ile authentik Karadeniz lezzetleri.",
    type: "website",
    locale: "tr_TR",
    images: [
      {
        url: "/images/giresun-yemekleri.jpg",
        width: 1200,
        height: 630,
        alt: "Giresun Yöresel Yemekleri"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Giresun Yöresel Yemekleri | Karadeniz'in Eşsiz Lezzetleri",
    description: "Giresun'un geleneksel mutfağını keşfedin. Yöresel yemek tarifleri ve yapılışları.",
    images: ["/images/giresun-yemekleri.jpg"]
  },
  alternates: {
    canonical: "https://giresun-rehberi.com/yoresel-yemekler"
  }
};

// Structured Data for Recipe Collection
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": foodData.foods.map((food, index) => ({
    "@type": "Recipe",
    "position": index + 1,
    "name": food.name,
    "description": food.description,
    "recipeCategory": food.category,
    "recipeIngredient": food.ingredients,
    "recipeInstructions": food.preparation?.map(step => ({
      "@type": "HowToStep",
      "text": step
    })),
    "image": food.image,
    "author": {
      "@type": "Organization",
      "name": "Giresun Rehberi"
    },
    "recipeCuisine": "Türk Mutfağı - Karadeniz",
    "areaServed": "Giresun, Türkiye"
  }))
};

export default function LocalFoodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LocalFoodClient />
    </>
  );
} 