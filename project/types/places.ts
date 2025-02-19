export interface BasePlace {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  district: string;
  geoLocation: {
    lat: number;
    lng: number;
  };
  rating: number;
  features: string[];
}

export interface Restaurant extends BasePlace {
  priceLevel: string;
}

export interface PlacesData {
  turistik: BasePlace[];
  restoranlar: Restaurant[];
  yaylalar: BasePlace[];
  // festivaller: BasePlace[]; // Şimdilik kaldırıyoruz
} 