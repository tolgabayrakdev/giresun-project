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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

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
  district: string;
  geoLocation: Location;
  rating: number;
  priceLevel?: "₺" | "₺₺" | "₺₺₺" | "₺₺₺₺";
  features: string[];
};

// İlçe bazlı filtreleme için yeni tip
type District = 'Merkez' | 'Dereli' | 'Bulancak' | 'Tirebolu' | 'Görele' | 
                'Şebinkarahisar' | 'Espiye' | 'Keşap' | 'Piraziz' | 'Eynesil' |
                'Güce' | 'Çamoluk' | 'Alucra' | 'Çanakçı' | 'Doğankent' | 
                'Yağlıdere' | 'Tümü';

// Genişletilmiş örnek veri
const placesData: Record<string, Place[]> = {
  turistik: [
    // Merkez
    {
      id: "1",
      title: "Giresun Kalesi",
      description: "Şehre hakim tepede yer alan tarihi kale, muhteşem manzarası ile ünlüdür.",
      image: "/turist/giresun-kalesi.jpeg",
      location: "Merkez",
      district: "Merkez",
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
      district: "Merkez",
      geoLocation: { lat: 40.925642, lng: 38.385867 },
      rating: 4.7,
      features: ["Ada", "Tekne Turu", "Tarihi"]
    },
    // Dereli
    {
      id: "3",
      title: "Kuzalan Şelalesi",
      description: "Dereli'nin en önemli doğal güzelliklerinden, muhteşem şelale ve yürüyüş parkurları.",
      image: "/turist/kuzalan-selalesi.jpg",
      location: "Dereli",
      district: "Dereli",
      geoLocation: { lat: 40.693056, lng: 38.455833 },
      rating: 4.8,
      features: ["Şelale", "Doğa", "Yürüyüş"]
    },
    // Şebinkarahisar
    {
      id: "4",
      title: "Şebinkarahisar Kalesi",
      description: "Tarihi kale ve eşsiz manzarasıyla ünlü turistik mekan.",
      image: "/turist/sebinkarahisar-kalesi.jpg",
      location: "Şebinkarahisar",
      district: "Şebinkarahisar",
      geoLocation: { lat: 40.286389, lng: 38.422778 },
      rating: 4.6,
      features: ["Tarihi Kale", "Manzara", "Kültürel Miras"]
    },
    // Tirebolu
    {
      id: "5",
      title: "Tirebolu Kalesi",
      description: "Deniz kıyısında tarihi kale ve muhteşem manzara.",
      image: "/turist/tirebolu-kalesi.jpg",
      location: "Tirebolu",
      district: "Tirebolu",
      geoLocation: { lat: 41.005833, lng: 38.813611 },
      rating: 4.5,
      features: ["Tarihi Kale", "Deniz", "Manzara"]
    },
    // Bulancak
    {
      id: "6",
      title: "Bulancak Sahili",
      description: "Uzun sahil şeridi ve yürüyüş alanları.",
      image: "/turist/bulancak-sahili.jpg",
      location: "Bulancak",
      district: "Bulancak",
      geoLocation: { lat: 40.938333, lng: 38.232778 },
      rating: 4.3,
      features: ["Sahil", "Yürüyüş", "Deniz"]
    },
    // Espiye
    {
      id: "7",
      title: "Yaylaköy Şelalesi",
      description: "Doğal güzelliği ile ünlü şelale ve mesire alanı.",
      image: "/turist/yayla-selalesi.jpg",
      location: "Espiye",
      district: "Espiye",
      geoLocation: { lat: 40.792778, lng: 38.702778 },
      rating: 4.4,
      features: ["Şelale", "Piknik", "Doğa"]
    }
  ],
  restoranlar: [
    {
      id: "1",
      title: "Haşlamacı Giresun",
      description: "Et Haşlama ve sebze yemekleri",
      image: "/api/placeholder/400/300",
      location: "Sahil yolu",
      district: "Merkez",
      geoLocation: { lat: 40.917890, lng: 38.391234 },
      rating: 4.2,
      priceLevel: "₺₺",
      features: ["Et Yemekleri", "Sebze Yemekleri"]
    },
    {
      id: "2",
      title: "Hazal Pide Lahmacun",
      description: "Pide ve lahmacun çeşitleri",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      district: "Merkez",
      geoLocation: { lat: 40.917543, lng: 38.392765 },
      rating: 3.9,
      priceLevel: "₺",
      features: ["Pide", "Lahmacun", "Aile Mekanı"]
    },
    {
      id: "3",
      title: "Karadeniz Sofrası",
      description: "Otantik atmosferde yöresel Karadeniz mutfağı.",
      image: "/api/placeholder/400/300",
      location: "Çınarlar",
      district: "Merkez",
      geoLocation: { lat: 40.915678, lng: 38.387654 },
      rating: 4.4,
      priceLevel: "₺₺",
      features: ["Yöresel", "Kahvaltı", "Aile Mekanı"]
    },
    {
      id: "4",
      title: "Grava Lounge",
      description: "Taze kahvaltı ve ana yemekler.",
      image: "/api/placeholder/400/300",
      location: "Güre",
      district: "Merkez",
      geoLocation: { lat: 40.917890, lng: 38.391234 },
      rating: 4.5,
      priceLevel: "₺₺",
      features: ["Yöresel", "Pide", "Aile Mekanı"]
    }
  ],
  oteller: [
    {
      id: "1",
      title: "Amazon Otel",
      description: "Şehir merkezinde 4 yıldızlı konfor ve deniz manzarası.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
      district: "Merkez",
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
      district: "Merkez",
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
      district: "Merkez",
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
      district: "Merkez",
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
      district: "Merkez",
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
      district: "Merkez",
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
  const [selectedDistrict, setSelectedDistrict] = useState<District>('Tümü');

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

  // İlçe listesini oluştur
  const districts = useMemo(() => {
    const uniqueDistricts = Array.from(new Set(places.map(place => place.district)));
    return ['Tümü', ...uniqueDistricts] as District[];
  }, [places]);

  // Filtreleme fonksiyonunu memoize edelim
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFeatures = selectedFeatures.length === 0 ||
        selectedFeatures.every(feature => place.features.includes(feature));

      const matchesDistrict = selectedDistrict === 'Tümü' || place.district === selectedDistrict;

      const matchesPrice = priceFilter.length === 0 ||
        (place.priceLevel && priceFilter.includes(place.priceLevel));

      return matchesSearch && matchesFeatures && matchesDistrict && matchesPrice;
    });
  }, [places, searchQuery, selectedFeatures, selectedDistrict, priceFilter]);

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
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Geri Dön Butonu */}
      <motion.div 
        className="fixed top-4 left-4 z-50"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={handleNavigate}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div 
        className="bg-green-900 text-white py-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryInfo.title}
          </h1>
          <p className="text-gray-200">
            {categoryInfo.description}
          </p>
        </div>
      </motion.div>

      {/* İlçe Seçimi ve Arama - Mobil Uyumlu */}
      <motion.div 
        className="container mx-auto px-4 py-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <Select
            value={selectedDistrict}
            onValueChange={(value: District) => setSelectedDistrict(value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="İlçe Seçin" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Mekan ara..."
                className="pl-10 w-full h-10 text-base"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                  <SlidersHorizontal size={20} className="mr-2 md:mr-0" />
                  <span className="hidden md:inline">Filtrele</span>
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
        </div>
      </motion.div>

      {/* Arama ve Filtreleme */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedDistrict + searchQuery}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredPlaces.length > 0 ? (
              selectedDistrict === 'Tümü' ? (
                // İlçelere göre grupla
                Object.entries(
                  filteredPlaces.reduce((acc, place) => {
                    const district = place.district;
                    if (!acc[district]) acc[district] = [];
                    acc[district].push(place);
                    return acc;
                  }, {} as Record<string, Place[]>)
                ).map(([district, places], index) => (
                  <motion.div 
                    key={district}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h2 className="text-xl font-semibold text-green-800 mb-4">{district}</h2>
                    <div className="space-y-4">
                      {places.map((place, placeIndex) => (
                        <motion.div
                          key={place.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * places.length + placeIndex) * 0.05 }}
                        >
                          <Card className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
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
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))
              ) : (
                // Seçili ilçe için direkt liste
                <div className="space-y-4">
                  {filteredPlaces.map((place, index) => (
                    <motion.div
                      key={place.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
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
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-gray-500">Aramanıza uygun sonuç bulunamadı.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 