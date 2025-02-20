import { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;

  const titles: Record<string, string> = {
    turistik: 'Giresun\'da Gezilecek Yerler | Tarihi ve Doğal Güzellikler',
    restoranlar: 'Giresun\'da En İyi Restoranlar | Yerel Lezzetler',
    yaylalar: 'Giresun Yaylaları | Doğal Güzellikler',
    festivaller: 'Giresun Festivalleri | Kültürel Etkinlikler'
  };

  const descriptions: Record<string, string> = {
    turistik: 'Giresun\'un tarihi ve doğal güzelliklerini keşfedin. En popüler turistik mekanlar, tarihi yerler ve gezilecek noktalar.',
    restoranlar: 'Giresun\'un en iyi restoranları ve yerel lezzetleri. Yöresel mutfak, taze deniz ürünleri ve özgün tatlar.',
    yaylalar: 'Giresun\'un eşsiz yaylaları ve doğal güzellikleri. Yemyeşil yaylalar, temiz hava ve muhteşem manzaralar.',
    festivaller: 'Giresun\'da düzenlenen festivaller ve kültürel etkinlikler. Yerel kutlamalar, müzik ve eğlence.'
  };

  return {
    title: titles[category] || 'Giresun Rehberi',
    description: descriptions[category] || 'Giresun şehir rehberi',
    keywords: `Giresun, ${category}, turizm, gezi, rehber`,
    openGraph: {
      title: titles[category] || 'Giresun Rehberi',
      description: descriptions[category] || 'Giresun şehir rehberi',
      images: [`/og-images/${category}.jpg`],
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const validCategories = ['turistik', 'restoranlar', 'yaylalar', 'festivaller'];
  
  if (!validCategories.includes(category)) {
    notFound(); // 404 sayfasına yönlendirir
  }

  return <CategoryPageClient category={category} />;
}
