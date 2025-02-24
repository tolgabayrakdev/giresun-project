import LocalFoodClient from './LocalFoodClient';

export const metadata = {
  title: "Giresun Yöresel Yemekleri - Karadeniz Mutfağının Lezzetleri",
  description: "Giresun'un geleneksel yemekleri, tarifleri ve yöresel lezzetleri. Karadeniz mutfağının eşsiz tatlarını keşfedin.",
  keywords: ["Giresun yemekleri", "Karadeniz mutfağı", "yöresel lezzetler", "Giresun mutfağı", "geleneksel tarifler"],
};

export default function LocalFoodPage() {
  return <LocalFoodClient />;
} 