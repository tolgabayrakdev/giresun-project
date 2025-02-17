"use client";

import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, SlidersHorizontal, ArrowLeft, Star, Navigation } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

// Kategoriler için veri tipleri
type Location = {
  lat: number;
  lng: number;
};

type Place = {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  geoLocation: Location;
  rating: number;
  priceLevel?: "₺" | "₺₺" | "₺₺₺" | "₺₺₺₺";
  features: string[];
};

// Genişletilmiş örnek veri
const placesData: Record<string, Place[]> = {
  turistik: [
    {
      id: "1",
      title: "Giresun Kalesi",
      description: "Şehre hakim tepede yer alan tarihi kale, muhteşem manzarası ile ünlüdür. Karadeniz'in en güzel manzaralarından birini sunar.",
      image: "/turist/giresun-kalesi.jpeg",
      location: "Merkez",
      geoLocation: { lat: 40.912977, lng: 38.389834 },
      rating: 4.5,
      features: ["Tarihi Yapı", "Manzara", "Yürüyüş"]
    },
    {
      id: "2",
      title: "Giresun Adası",
      description: "Doğu Karadeniz'in tek adası, antik kalıntıları ve doğal güzelliği ile öne çıkar.",
      image: "/turist/giresun-adasi.jpg",
      location: "Merkez sahil",
      geoLocation: { lat: 40.925642, lng: 38.385867 },
      rating: 4.7,
      features: ["Ada", "Tekne Turu", "Tarihi"]
    },
    {
      id: "3",
      title: "Kümbet Yaylası",
      description: "1800 metre yükseklikte, yeşilin her tonunu barındıran muhteşem yayla.",
      image: "/api/placeholder/400/300",
      location: "Merkeze 40 km",
      geoLocation: { lat: 40.693056, lng: 38.455833 },
      rating: 4.8,
      features: ["Yayla", "Doğa", "Kamp"]
    }
  ],
  restoranlar: [
    {
      id: "1",
      title: "Çıtır Balık",
      description: "Taze Karadeniz balıkları ve meze çeşitleri.",
      image: "/api/placeholder/400/300",
      location: "Sahil yolu",
      geoLocation: { lat: 40.917890, lng: 38.391234 },
      rating: 4.2,
      priceLevel: "₺₺",
      features: ["Deniz Ürünleri", "Manzaralı", "Alkollü"]
    },
    {
      id: "2",
      title: "Fındık Pide Salonu",
      description: "Geleneksel Giresun pidesi ve yöresel lezzetler.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      geoLocation: { lat: 40.917543, lng: 38.392765 },
      rating: 4.6,
      priceLevel: "₺",
      features: ["Pide", "Karadeniz Mutfağı", "Aile Mekanı"]
    },
    {
      id: "3",
      title: "Karadeniz Sofrası",
      description: "Otantik atmosferde yöresel Karadeniz mutfağı.",
      image: "/api/placeholder/400/300",
      location: "Çınarlar",
      geoLocation: { lat: 40.915678, lng: 38.387654 },
      rating: 4.4,
      priceLevel: "₺₺",
      features: ["Yöresel", "Kahvaltı", "Aile Mekanı"]
    }
  ],
  oteller: [
    {
      id: "1",
      title: "Amazon Otel",
      description: "Şehir merkezinde 4 yıldızlı konfor ve deniz manzarası.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      geoLocation: { lat: 40.916789, lng: 38.390123 },
      rating: 4.3,
      priceLevel: "₺₺₺",
      features: ["Deniz Manzarası", "Spa", "Restoran", "Ücretsiz Otopark"]
    },
    {
      id: "2",
      title: "Kümbet Dağ Evi",
      description: "Kümbet Yaylası'nda doğayla iç içe konaklama deneyimi.",
      image: "/api/placeholder/400/300",
      location: "Kümbet Yaylası",
      geoLocation: { lat: 40.693456, lng: 38.456789 },
      rating: 4.7,
      priceLevel: "₺₺",
      features: ["Doğa", "Şömine", "Kahvaltı", "Trekking"]
    },
    {
      id: "3",
      title: "Sahil Butik Otel",
      description: "Sahile sıfır konumu ile huzurlu bir konaklama.",
      image: "/api/placeholder/400/300",
      location: "Sahil",
      geoLocation: { lat: 40.913456, lng: 38.388901 },
      rating: 4.5,
      priceLevel: "₺₺",
      features: ["Deniz Manzarası", "Kahvaltı", "Wifi"]
    }
  ],
  alisveris: [
    {
      id: "1",
      title: "Giresun Çarşısı",
      description: "Geleneksel el sanatları ve yöresel ürünler.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      geoLocation: { lat: 40.917890, lng: 38.391234 },
      rating: 4.4,
      features: ["Hediyelik Eşya", "Yöresel Ürünler", "Fındık Ürünleri"]
    },
    {
      id: "2",
      title: "Forum Giresun",
      description: "Modern alışveriş merkezi ve eğlence kompleksi.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      geoLocation: { lat: 40.918901, lng: 38.392345 },
      rating: 4.3,
      features: ["AVM", "Sinema", "Yeme-İçme", "Otopark"]
    },
    {
      id: "3",
      title: "Fındık Pazarı",
      description: "Yerel fındık üreticilerinin taze ürünleri.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      geoLocation: { lat: 40.916789, lng: 38.390123 },
      rating: 4.6,
      features: ["Fındık", "Yöresel Ürünler", "Organik"]
    }
  ]
};

// Kategori başlıkları ve açıklamaları için obje
const categoryDetails: Record<string, { title: string, description: string }> = {
  turistik: {
    title: "Gezilecek Yerler",
    description: "Giresun'un tarihi ve doğal güzelliklerini keşfedin"
  },
  restoranlar: {
    title: "Restoranlar",
    description: "Giresun'un eşsiz lezzetlerini tadın"
  },
  yaylalar: {
    title: "Yaylalar",
    description: "Giresun'un muhteşem yaylalarını keşfedin"
  },
  festivaller: {
    title: "Festivaller ve Etkinlikler",
    description: "Giresun'un kültürel etkinliklerini deneyimleyin"
  }
};

// Varsayılan görsel için base64 string
const placeholderImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Mi85OEI2PTZFOT5ZXVlZfG1+fW5/Z3xkfGVsZGR7Z3v/2wBDARUXFx4aHh8fHHtsOCw4bGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

interface CategoryPageClientProps {
  category: string;
}

// Görsel bileşeni
const ImageWithFallback = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [error, setError] = useState(false);

  return (
    <div className="relative h-64 md:h-full bg-gray-100">
      {!error ? (
        <img
          src={src}
          alt={alt}
          {...props}
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Görsel Bulunamadı</span>
        </div>
      )}
    </div>
  );
};

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);

  // Kategori bilgilerini memoize edelim
  const categoryInfo = useMemo(() => 
    categoryDetails[category] || {
      title: "Mekanlar",
      description: "Giresun'un en iyi mekanlarını keşfedin"
    },
    [category]
  );

  // Places ve features'ları memoize edelim
  const places = useMemo(() => placesData[category] || [], [category]);
  const allFeatures = useMemo(() => 
    Array.from(new Set(places.flatMap(place => place.features))),
    [places]
  );

  // Filtreleme fonksiyonunu memoize edelim
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFeatures = selectedFeatures.length === 0 ||
        selectedFeatures.every(feature => place.features.includes(feature));

      const matchesPrice = priceFilter.length === 0 ||
        (place.priceLevel && priceFilter.includes(place.priceLevel));

      return matchesSearch && matchesFeatures && matchesPrice;
    });
  }, [places, searchQuery, selectedFeatures, priceFilter]);

  // Event handler'ları useCallback ile optimize edelim
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFeatureChange = useCallback((feature: string, checked: boolean) => {
    setSelectedFeatures(prev => 
      checked ? [...prev, feature] : prev.filter(f => f !== feature)
    );
  }, []);

  const handlePriceChange = useCallback((price: string, checked: boolean) => {
    setPriceFilter(prev =>
      checked ? [...prev, price] : prev.filter(p => p !== price)
    );
  }, []);

  const handleNavigate = useCallback(() => {
    router.push('/#kategoriler');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Geri Dön Butonu */}
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={handleNavigate}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Header */}
      <div className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryInfo.title}
          </h1>
          <p className="text-gray-200">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* Arama ve Filtreleme */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Mekan ara..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <SlidersHorizontal size={20} />
                Filtrele
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtreler</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <h3 className="font-semibold mb-3">Özellikler</h3>
                <div className="space-y-2">
                  {allFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={selectedFeatures.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, !!checked)}
                      />
                      <label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>

                {(category === 'restoranlar' || category === 'oteller') && (
                  <>
                    <h3 className="font-semibold mb-3 mt-6">Fiyat Aralığı</h3>
                    <div className="space-y-2">
                      {["₺", "₺₺", "₺₺₺", "₺₺₺₺"].map((price) => (
                        <div key={price} className="flex items-center space-x-2">
                          <Checkbox
                            id={price}
                            checked={priceFilter.includes(price)}
                            onCheckedChange={(checked) => handlePriceChange(price, !!checked)}
                          />
                          <label htmlFor={price} className="text-sm font-medium leading-none">
                            {price}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Sonuçlar */}
        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '4/3' }}
                  />
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{place.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{place.description}</p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {place.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{place.location}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 text-green-600 hover:text-green-700"
                          onClick={() => {
                            if (navigator.geolocation) {
                              navigator.geolocation.getCurrentPosition((position) => {
                                const userLat = position.coords.latitude;
                                const userLng = position.coords.longitude;
                                const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${place.geoLocation.lat},${place.geoLocation.lng}`;
                                window.open(url, '_blank');
                              }, () => {
                                const url = `https://www.google.com/maps/search/?api=1&query=${place.geoLocation.lat},${place.geoLocation.lng}`;
                                window.open(url, '_blank');
                              });
                            } else {
                              const url = `https://www.google.com/maps/search/?api=1&query=${place.geoLocation.lat},${place.geoLocation.lng}`;
                              window.open(url, '_blank');
                            }
                          }}
                        >
                          <Navigation className="h-4 w-4" />
                          <span className="hidden sm:inline">Yol Tarifi</span>
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                          onClick={() => {
                            const url = `https://www.google.com/maps/search/?api=1&query=${place.geoLocation.lat},${place.geoLocation.lng}`;
                            window.open(url, '_blank');
                          }}
                        >
                          <MapPin className="h-4 w-4" />
                          <span className="hidden sm:inline">Konumu Gör</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aramanıza uygun sonuç bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
} 