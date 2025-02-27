"use client";

import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, SlidersHorizontal, ArrowLeft, Star, Navigation, Clock } from "lucide-react";
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
import placesData from '@/data/places.json';
import restaurantsData from '@/data/restaurants.json';
import plateausData from '@/data/plateaus.json';
import festivalsData from '@/data/festivals.json';
import { BasePlace, Restaurant, PlacesData } from '@/types/places';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Kategoriler için veri tipleri
type Location = {
  lat: number;
  lng: number;
};

// İlçe bazlı filtreleme için yeni tip
type District = 'Merkez' | 'Dereli' | 'Bulancak' | 'Tirebolu' | 'Görele' | 
                'Şebinkarahisar' | 'Espiye' | 'Keşap' | 'Piraziz' | 'Eynesil' |
                'Güce' | 'Çamoluk' | 'Alucra' | 'Çanakçı' | 'Doğankent' | 
                'Yağlıdere' | 'Tümü';

// Tüm verileri birleştir
const allData: Record<string, BasePlace[] | Restaurant[]> = {
  turistik: placesData.turistik,
  restoranlar: restaurantsData.restoranlar,
  yaylalar: plateausData.yaylalar,
  festivaller: festivalsData.festivaller,
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
  }
};

// Tarihi yerler için detaylı bilgi
interface HistoricalDetails {
  longHistory: string;
  architecture: string;
  culturalImportance: string;
  modernDay: string;
  visitingHours: string;
  entranceFee: string;
  transportation: string;
  tips: string[];
  historicalPeriods: {
    period: string;
    details: string;
  }[];
}

const historicalPlaceDetails: Record<string, HistoricalDetails> = {
  "Giresun Kalesi": {
    longHistory: `Giresun Kalesi'nin tarihi M.Ö. 2. yüzyıla kadar uzanmaktadır. Pontus Krallığı döneminde inşa edilen kale, stratejik konumu nedeniyle tarih boyunca büyük önem taşımıştır. 

    Kalenin bulunduğu tepe, antik çağlarda "Aretias" olarak biliniyordu ve mitolojiye göre Amazon kraliçelerinden Lyseira'nın mezarının burada olduğuna inanılmaktadır.
    
    Roma İmparatorluğu döneminde gözetleme ve savunma amaçlı kullanılan kale, Bizans döneminde genişletilmiş ve güçlendirilmiştir. Osmanlı İmparatorluğu döneminde de aktif olarak kullanılan kale, şehrin korunmasında önemli rol oynamıştır.`,
    
    architecture: `Kale, yaklaşık 130 metre yükseklikte bir tepe üzerine inşa edilmiştir. Düzensiz dikdörtgen planlı olan yapı, farklı dönemlere ait mimari özellikler taşımaktadır.

    Kalenin duvarları kesme taş ve moloz taş kullanılarak örülmüştür. İç kısımda su sarnıçları, depo odaları ve gözetleme kuleleri bulunmaktadır. Özellikle Helenistik ve Roma dönemlerine ait duvar örgü teknikleri hala görülebilmektedir.
    
    Kalenin eteklerinde bulunan kaya mezarları ve antik dönem kalıntıları, bölgenin zengin tarihini yansıtmaktadır.`,
    
    culturalImportance: `Giresun Kalesi, şehrin en önemli tarihi ve kültürel simgelerinden biridir. Yüzyıllar boyunca farklı medeniyetlere ev sahipliği yapan kale, bu medeniyetlerin izlerini günümüze taşımaktadır.

    Kale, aynı zamanda şehrin efsanelerinde ve halk hikayelerinde önemli bir yer tutmaktadır. Amazon kraliçelerinin hikayeleri ve mitolojik öyküler, kalenin kültürel önemini artırmaktadır.`,
    
    modernDay: `Günümüzde Giresun'un en önemli turistik mekanlarından biri olan kale, ziyaretçilerine muhteşem bir şehir manzarası sunmaktadır. Özellikle gün batımında eşsiz fotoğraf kareleri yakalanabilmektedir.

    Kale çevresinde yapılan düzenlemeler ve restorasyon çalışmaları ile ziyaretçilere daha iyi bir deneyim sunulmaktadır. Kalenin çevresindeki yürüyüş parkurları ve seyir terasları, ziyaretçilerin keyifli vakit geçirmesini sağlamaktadır.`,
    
    visitingHours: "Her gün 08:00 - 22:00 arası ziyarete açıktır.",
    entranceFee: "Giriş ücretsizdir.",
    transportation: "Şehir merkezinden taksi veya özel araçla 10 dakika, yürüyerek 30 dakika mesafededir.",
    tips: [
      "Gün batımı saatlerinde ziyaret edilmesi önerilir",
      "Fotoğraf çekimi için sabah erken saatler veya gün batımı idealdır",
      "Rahat yürüyüş ayakkabıları giyilmesi önerilir",
      "Su ve atıştırmalık bulundurmanız tavsiye edilir",
      "Dürbün getirmeniz önerilir"
    ],
    historicalPeriods: [
      {
        period: "Pontus Dönemi (M.Ö. 2. yy)",
        details: "Kalenin ilk inşa edildiği dönem. Temel yapı bu dönemde oluşturuldu."
      },
      {
        period: "Roma Dönemi (M.Ö. 1. yy - M.S. 395)",
        details: "Kale genişletildi ve askeri üs olarak kullanıldı."
      },
      {
        period: "Bizans Dönemi (395-1461)",
        details: "Savunma sistemi güçlendirildi, yeni kuleler eklendi."
      },
      {
        period: "Osmanlı Dönemi (1461-1923)",
        details: "Kale aktif olarak kullanıldı ve birçok kez onarıldı."
      }
    ]
  },
  "Giresun Adası": {
    longHistory: `Doğu Karadeniz'in tek adası olan Giresun Adası, antik dönemde Aretias veya Khalkeritis adıyla biliniyordu. Mitolojide önemli bir yere sahip olan ada, Amazon savaşçılarının yaşadığı yer olarak bilinmektedir.

    Antik kaynaklarda adada Ares'e adanmış bir tapınağın varlığından bahsedilmektedir. Bu tapınakta efsanevi Altın Post'un bir süre saklandığı rivayet edilmektedir.
    
    Ada, tarih boyunca önemli bir dini merkez olmuş, özellikle Bizans döneminde manastır olarak kullanılmıştır.`,
    
    architecture: `Ada üzerinde farklı dönemlere ait yapı kalıntıları bulunmaktadır. Bunlar arasında:
    - Antik Yunan dönemine ait tapınak kalıntıları
    - Bizans dönemine ait manastır ve şapel kalıntıları
    - Çeşitli su sarnıçları
    - Mezar odaları
    bulunmaktadır.
    
    Adanın kuzey ve güney kıyılarında antik döneme ait liman kalıntıları görülebilmektedir.`,
    
    culturalImportance: `Giresun Adası, bölgenin en önemli kültürel miraslarından biridir. Hem mitolojik hikayeleri hem de tarihsel önemi ile dikkat çekmektedir.

    Ada, Argonautlar efsanesinde de geçmekte olup, antik dönemin önemli dini merkezlerinden biri olarak kabul edilmektedir.
    
    Günümüzde ada, doğal güzelliği ve tarihi değeriyle önemli bir turizm noktasıdır.`,
    
    modernDay: `Günümüzde koruma altında olan ada, kontrollü ziyaretlere açıktır. Adada yapılan arkeolojik çalışmalar devam etmektedir.

    Ada aynı zamanda birçok endemik bitki türüne ev sahipliği yapmaktadır. Özellikle bahar aylarında ada yüzeyi renkli çiçeklerle kaplanmaktadır.
    
    Deniz turizmi açısından da önemli olan ada, tekne turları için popüler bir destinasyondur.`,
    
    visitingHours: "Yaz sezonu boyunca (Mayıs-Ekim) tekne turları ile ziyaret edilebilir.",
    entranceFee: "Tekne turu ücretleri değişkenlik göstermektedir (kişi başı yaklaşık 50-100 TL).",
    transportation: "Giresun limanından kalkan teknelerle ulaşım sağlanmaktadır.",
    tips: [
      "Hava durumunu kontrol ederek ziyaret planı yapılmalıdır",
      "Yanınızda su ve atıştırmalık bulundurun",
      "Fotoğraf makinesi getirmeniz önerilir",
      "Yaz aylarında şapka ve güneş kremi kullanımı önemlidir",
      "Adada tuvalet ve büfe bulunmamaktadır"
    ],
    historicalPeriods: [
      {
        period: "Antik Dönem",
        details: "Ares Tapınağı'nın bulunduğu ve Amazon savaşçılarının yaşadığı dönem"
      },
      {
        period: "Roma Dönemi",
        details: "Adanın önemli bir dini merkez olarak kullanıldığı dönem"
      },
      {
        period: "Bizans Dönemi",
        details: "Manastır olarak kullanıldığı ve dini yapıların inşa edildiği dönem"
      },
      {
        period: "Modern Dönem",
        details: "Koruma altına alınan ve turizme açılan dönem"
      }
    ]
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
    <div className="relative h-48 md:h-64 bg-gray-100">
      {!error ? (
        <img
          src={src}
          alt={alt}
          {...props}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <span className="text-gray-400">Görsel Bulunamadı</span>
        </div>
      )}
    </div>
  );
};

// Type guard ekleyelim
function isRestaurant(place: BasePlace): place is Restaurant {
  return 'priceLevel' in place;
}

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
  const places = useMemo(() => allData[category] || [], [category]);
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
        (isRestaurant(place) && priceFilter.includes(place.priceLevel));

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
                  }, {} as Record<string, BasePlace[]>)
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
                                />
                              </div>
                              
                              <div className="md:w-2/3 p-4 md:p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg md:text-xl font-semibold">{place.title}</h3>
                                  <div className="flex items-center">
                                    <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
                                    <span className="text-xs md:text-sm font-medium">{place.rating}</span>
                                  </div>
                                </div>

                                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{place.description}</p>

                                <div className="space-y-3 md:space-y-4">
                                  <div className="flex flex-wrap gap-1 md:gap-2">
                                    {place.features.map((feature) => (
                                      <span
                                        key={feature}
                                        className="text-xs bg-green-100 text-green-800 px-2 py-0.5 md:py-1 rounded-full"
                                      >
                                        {feature}
                                      </span>
                                    ))}
                                  </div>

                                  {historicalPlaceDetails[place.title] && (
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <span className="text-sm text-green-600 hover:text-green-800 cursor-pointer hover:underline flex items-center gap-1">
                                          <span>📜</span>
                                          <span>Kapsamlı bilgi için tıklayın</span>
                                        </span>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                          <DialogTitle className="text-xl font-semibold text-green-800">{place.title}</DialogTitle>
                                        </DialogHeader>
                                        <div className="mt-4 space-y-6">
                                          <div>
                                            <h4 className="font-semibold text-green-800 mb-2">📜 Tarihçe</h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].longHistory}</p>
                                          </div>

                                          <div>
                                            <h4 className="font-semibold text-green-800 mb-2">🏛️ Mimari</h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].architecture}</p>
                                          </div>

                                          <div>
                                            <h4 className="font-semibold text-green-800 mb-2">🎭 Kültürel Önemi</h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].culturalImportance}</p>
                                          </div>

                                          <div>
                                            <h4 className="font-semibold text-green-800 mb-2">🌟 Günümüzdeki Durumu</h4>
                                            <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].modernDay}</p>
                                          </div>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                              <h4 className="font-semibold text-green-800 mb-2">⌚ Ziyaret Bilgileri</h4>
                                              <div className="space-y-2 text-sm text-gray-600">
                                                <div className="flex items-center gap-2">
                                                  <Clock className="h-4 w-4 text-green-600" />
                                                  <span>{historicalPlaceDetails[place.title].visitingHours}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <MapPin className="h-4 w-4 text-green-600" />
                                                  <span>{historicalPlaceDetails[place.title].transportation}</span>
                                                </div>
                                              </div>
                                            </div>

                                            <div>
                                              <h4 className="font-semibold text-green-800 mb-2">💡 Ziyaret İpuçları</h4>
                                              <ul className="list-disc list-inside text-sm text-gray-600">
                                                {historicalPlaceDetails[place.title].tips.map((tip, index) => (
                                                  <li key={index}>{tip}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>

                                          <div>
                                            <h4 className="font-semibold text-green-800 mb-2">📅 Tarihsel Dönemler</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              {historicalPlaceDetails[place.title].historicalPeriods.map((period, index) => (
                                                <div key={index} className="text-sm border rounded-lg p-3">
                                                  <span className="font-medium text-green-700 block mb-1">{period.period}</span>
                                                  <span className="text-gray-600">{period.details}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  )}

                                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t">
                                    <div className="flex items-center text-gray-500">
                                      <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                      <span className="text-xs md:text-sm">{place.location}</span>
                                    </div>

                                    <div className="flex gap-1 md:gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs md:text-sm flex items-center gap-1 md:gap-2 text-green-600 hover:text-green-700 px-2 py-1 md:px-3 md:py-2"
                                        onClick={() => {
                                          // Google Maps yol tarifi URL'i
                                          const destination = `${place.title}, ${place.location}, Giresun`;
                                          const encodedDestination = encodeURIComponent(destination);
                                          
                                          if (navigator.geolocation) {
                                            navigator.geolocation.getCurrentPosition((position) => {
                                              const userLat = position.coords.latitude;
                                              const userLng = position.coords.longitude;
                                              const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${encodedDestination}`;
                                              window.open(url, '_blank');
                                            }, () => {
                                              // Konum alınamazsa direkt olarak varış noktasına yönlendir
                                              const url = `https://www.google.com/maps/dir//${encodedDestination}`;
                                              window.open(url, '_blank');
                                            });
                                          } else {
                                            const url = `https://www.google.com/maps/dir//${encodedDestination}`;
                                            window.open(url, '_blank');
                                          }
                                        }}
                                      >
                                        <Navigation className="h-3 w-3 md:h-4 md:w-4" />
                                        <span className="hidden sm:inline">Yol Tarifi</span>
                                      </Button>

                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-xs md:text-sm flex items-center gap-1 md:gap-2 text-blue-600 hover:text-blue-700 px-2 py-1 md:px-3 md:py-2"
                                        onClick={() => {
                                          // Google Maps arama URL'i
                                          const query = `${place.title}, ${place.location}, Giresun`;
                                          const encodedQuery = encodeURIComponent(query);
                                          const url = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
                                          window.open(url, '_blank');
                                        }}
                                      >
                                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
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
                            />
                          </div>
                          
                          <div className="md:w-2/3 p-4 md:p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg md:text-xl font-semibold">{place.title}</h3>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1" />
                                <span className="text-xs md:text-sm font-medium">{place.rating}</span>
                              </div>
                            </div>

                            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">{place.description}</p>

                            <div className="space-y-3 md:space-y-4">
                              <div className="flex flex-wrap gap-1 md:gap-2">
                                {place.features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="text-xs bg-green-100 text-green-800 px-2 py-0.5 md:py-1 rounded-full"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>

                              {historicalPlaceDetails[place.title] && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <span className="text-sm text-green-600 hover:text-green-800 cursor-pointer hover:underline flex items-center gap-1">
                                      <span>📜</span>
                                      <span>Kapsamlı bilgi için tıklayın</span>
                                    </span>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle className="text-xl font-semibold text-green-800">{place.title}</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4 space-y-6">
                                      <div>
                                        <h4 className="font-semibold text-green-800 mb-2">📜 Tarihçe</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].longHistory}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold text-green-800 mb-2">🏛️ Mimari</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].architecture}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold text-green-800 mb-2">🎭 Kültürel Önemi</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].culturalImportance}</p>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold text-green-800 mb-2">🌟 Günümüzdeki Durumu</h4>
                                        <p className="text-sm text-gray-600 whitespace-pre-line">{historicalPlaceDetails[place.title].modernDay}</p>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="font-semibold text-green-800 mb-2">⌚ Ziyaret Bilgileri</h4>
                                          <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                              <Clock className="h-4 w-4 text-green-600" />
                                              <span>{historicalPlaceDetails[place.title].visitingHours}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <MapPin className="h-4 w-4 text-green-600" />
                                              <span>{historicalPlaceDetails[place.title].transportation}</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div>
                                          <h4 className="font-semibold text-green-800 mb-2">💡 Ziyaret İpuçları</h4>
                                          <ul className="list-disc list-inside text-sm text-gray-600">
                                            {historicalPlaceDetails[place.title].tips.map((tip, index) => (
                                              <li key={index}>{tip}</li>
                                            ))}
                                          </ul>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold text-green-800 mb-2">📅 Tarihsel Dönemler</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {historicalPlaceDetails[place.title].historicalPeriods.map((period, index) => (
                                            <div key={index} className="text-sm border rounded-lg p-3">
                                              <span className="font-medium text-green-700 block mb-1">{period.period}</span>
                                              <span className="text-gray-600">{period.details}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}

                              <div className="flex items-center justify-between pt-3 md:pt-4 border-t">
                                <div className="flex items-center text-gray-500">
                                  <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                                  <span className="text-xs md:text-sm">{place.location}</span>
                                </div>

                                <div className="flex gap-1 md:gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs md:text-sm flex items-center gap-1 md:gap-2 text-green-600 hover:text-green-700 px-2 py-1 md:px-3 md:py-2"
                                    onClick={() => {
                                      // Google Maps yol tarifi URL'i
                                      const destination = `${place.title}, ${place.location}, Giresun`;
                                      const encodedDestination = encodeURIComponent(destination);
                                      
                                      if (navigator.geolocation) {
                                        navigator.geolocation.getCurrentPosition((position) => {
                                          const userLat = position.coords.latitude;
                                          const userLng = position.coords.longitude;
                                          const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${encodedDestination}`;
                                          window.open(url, '_blank');
                                        }, () => {
                                          // Konum alınamazsa direkt olarak varış noktasına yönlendir
                                          const url = `https://www.google.com/maps/dir//${encodedDestination}`;
                                          window.open(url, '_blank');
                                        });
                                      } else {
                                        const url = `https://www.google.com/maps/dir//${encodedDestination}`;
                                        window.open(url, '_blank');
                                      }
                                    }}
                                  >
                                    <Navigation className="h-3 w-3 md:h-4 md:w-4" />
                                    <span className="hidden sm:inline">Yol Tarifi</span>
                                  </Button>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs md:text-sm flex items-center gap-1 md:gap-2 text-blue-600 hover:text-blue-700 px-2 py-1 md:px-3 md:py-2"
                                    onClick={() => {
                                      // Google Maps arama URL'i
                                      const query = `${place.title}, ${place.location}, Giresun`;
                                      const encodedQuery = encodeURIComponent(query);
                                      const url = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
                                      window.open(url, '_blank');
                                    }}
                                  >
                                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
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