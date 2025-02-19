export interface BasePlace {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  district: string;
  rating: number;
  features: string[];
}

export interface Restaurant extends BasePlace {
  priceLevel: "₺" | "₺₺" | "₺₺₺" | "₺₺₺₺";
}

export interface PlacesData {
  turistik: BasePlace[];
  restoranlar: Restaurant[];
  yaylalar: BasePlace[];
  // festivaller: BasePlace[]; // Şimdilik kaldırıyoruz
} 