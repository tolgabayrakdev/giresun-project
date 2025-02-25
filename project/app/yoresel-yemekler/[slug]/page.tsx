import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import foodData from '@/data/food.json';
import FoodDetailClient from './FoodDetailClient';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

// Slug oluşturma fonksiyonu
function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Metadata oluşturma
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const food = foodData.foods.find(
    (food) => createSlug(food.name) === resolvedParams.slug
  );

  if (!food) {
    return {
      title: 'Yemek Bulunamadı',
      description: 'Aradığınız yemek bulunamadı.'
    };
  }

  return {
    title: `${food.name} - Giresun Yöresel Yemeği | Tarifi ve Yapılışı`,
    description: `${food.name} tarifi, malzemeleri ve yapılışı. ${food.description}`,
    keywords: [
      food.name,
      'Giresun yemekleri',
      'Karadeniz mutfağı',
      'yöresel yemek',
      'tarif',
      ...food.ingredients
    ],
    openGraph: {
      title: `${food.name} - Giresun Mutfağından Özel Tarif`,
      description: food.description,
      type: 'article',
      locale: 'tr_TR',
      images: [
        {
          url: food.image,
          width: 1200,
          height: 630,
          alt: food.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${food.name} - Giresun Mutfağından`,
      description: food.description,
      images: [food.image]
    }
  };
}

// Structured Data
function generateStructuredData(food: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: food.name,
    description: food.description,
    image: food.image,
    recipeCategory: food.category,
    recipeCuisine: 'Türk Mutfağı - Karadeniz',
    recipeIngredient: food.ingredients,
    recipeInstructions: food.preparation?.map((step: string) => ({
      '@type': 'HowToStep',
      text: step
    })),
    author: {
      '@type': 'Organization',
      name: 'Giresun Rehberi'
    },
    datePublished: '2024-03-20',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150'
    }
  };
}

export default async function FoodDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const food = foodData.foods.find(
    (food) => createSlug(food.name) === resolvedParams.slug
  );

  if (!food) {
    notFound();
  }

  const structuredData = generateStructuredData(food);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FoodDetailClient food={food} />
    </>
  );
} 