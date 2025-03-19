import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import foodData from '@/data/food.json';
import FoodDetailClient from './FoodDetailClient';

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

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Metadata oluşturma
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
      ...food.recipeIngredient
    ],
    openGraph: {
      title: `${food.name} - Giresun Mutfağından Özel Tarif`,
      description: food.description,
      type: 'article',
      locale: 'tr_TR',
      images: [
        {
          url: food.image[0].url,
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
      images: [food.image[0].url]
    }
  };
}

// Client component için food nesnesini dönüştürme
function transformFoodForClient(food: any) {
  return {
    name: food.name,
    description: food.description,
    category: food.recipeCategory,
    ingredients: food.recipeIngredient.map((ingredient: string) => ingredient.split(',')[0]),
    detailedIngredients: food.recipeIngredient,
    preparation: food.recipeInstructions.map((step: any) => step.text),
    image: food.image[0].url
  };
}

export default async function FoodDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const food = foodData.foods.find(
    (food) => createSlug(food.name) === resolvedParams.slug
  );

  if (!food) {
    notFound();
  }

  const clientFood = transformFoodForClient(food);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(food) }}
      />
      <FoodDetailClient food={clientFood} />
    </>
  );
} 