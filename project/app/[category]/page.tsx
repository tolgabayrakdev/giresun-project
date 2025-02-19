import { Metadata } from "next";
import CategoryPageClient from "./CategoryPageClient";

type Props = {
  params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = params.category

  const titles = {
    turistik: 'Giresun\'da Gezilecek Yerler | Tarihi ve Doğal Güzellikler',
    restoranlar: 'Giresun\'un En İyi Restoranları | Yerel Lezzetler',
    yaylalar: 'Giresun Yaylaları | Doğa ve Huzur',
    festivaller: 'Giresun Festival ve Etkinlikleri | Kültür ve Eğlence'
  }

  const descriptions = {
    turistik: 'Giresun\'un tarihi ve doğal güzellikleri, kaleler, adalar ve gezilecek yerler hakkında detaylı bilgi.',
    restoranlar: 'Giresun\'un en iyi restoranları, yerel lezzetleri ve meşhur Karadeniz mutfağı.',
    yaylalar: 'Giresun\'un eşsiz yaylaları, Kümbet, Kulakkaya ve diğer yayla turizmi noktaları.',
    festivaller: 'Giresun\'da düzenlenen festivaller, şenlikler ve kültürel etkinlikler takvimi.'
  }

  return {
    title: titles[category as keyof typeof titles] || 'Giresun Rehberi',
    description: descriptions[category as keyof typeof descriptions] || 'Giresun şehir rehberi',
    keywords: `Giresun, ${category}, turizm, gezi, rehber`,
    openGraph: {
      title: titles[category as keyof typeof titles] || 'Giresun Rehberi',
      description: descriptions[category as keyof typeof descriptions] || 'Giresun şehir rehberi',
      images: [`/og-images/${category}.jpg`],
    },
  }
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = resolvedParams.category;
  
  return <CategoryPageClient category={category} />;
}
