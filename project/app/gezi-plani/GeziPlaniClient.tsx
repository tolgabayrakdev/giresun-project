"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, TreePine, Palmtree, Building, Waves, Map } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import placesData from '@/data/places.json';
import restaurantsData from '@/data/restaurants.json';
import plateausData from '@/data/plateaus.json';
import { SharePlan } from "@/components/SharePlan";

type TripPreference = "tarihi" | "dogal" | "kultur" | "deniz";
type TimeOfDay = "sabah" | "ogle" | "aksam";
type RestaurantType = "balik" | "yerel" | "modern";
type District = "merkez" | "bulancak" | "gorele" | "tirebolu" | "espiye" | "kesap";
type DifficultyLevel = "kolay" | "orta" | "zor";

interface TripPlan {
  preference: TripPreference;
  timeOfDay: TimeOfDay;
  duration: number;
  restaurantType: RestaurantType;
  wantsSunset: boolean;
  selectedDistrict: District;
  numberOfDays: number;
  difficultyLevel: DifficultyLevel;
  season: string;
}

export default function GeziPlaniClient() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<TripPlan>({
    preference: "tarihi",
    timeOfDay: "sabah",
    duration: 4,
    restaurantType: "yerel",
    wantsSunset: true,
    selectedDistrict: "merkez",
    numberOfDays: 1,
    difficultyLevel: "kolay",
    season: new Date().getMonth() >= 2 && new Date().getMonth() <= 4 ? "ilkbahar" :
           new Date().getMonth() >= 5 && new Date().getMonth() <= 7 ? "yaz" :
           new Date().getMonth() >= 8 && new Date().getMonth() <= 10 ? "sonbahar" : "kis"
  });

  const [showPlan, setShowPlan] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const plans = {
    tarihi: {
      places: placesData.turistik
        .filter(place => place.features.includes("Tarihi"))
        .slice(0, 3)
        .map(place => place.title),
      restaurants: {
        balik: restaurantsData.restoranlar
          .find(r => r.features.includes("Balık"))?.title || "Şoray Balık Lokantası",
        yerel: restaurantsData.restoranlar
          .find(r => r.features.includes("Yöresel"))?.title || "Serender Restaurant",
        modern: restaurantsData.restoranlar
          .find(r => r.features.includes("Modern"))?.title || "Grava Lounge"
      },
      sunset: "Giresun Kalesi'nden gün batımı"
    },
    dogal: {
      places: [
        ...plateausData.yaylalar.slice(0, 2).map(yayla => yayla.title),
        ...placesData.turistik
          .filter(place => place.features.includes("Doğa"))
          .slice(0, 1)
          .map(place => place.title)
      ],
      restaurants: {
        balik: restaurantsData.restoranlar
          .find(r => r.features.includes("Balık"))?.title || "Deniz Restaurant",
        yerel: restaurantsData.restoranlar
          .find(r => r.features.includes("Yöresel"))?.title || "Pide Sarayı",
        modern: restaurantsData.restoranlar
          .find(r => r.features.includes("Cafe"))?.title || "Turkuaz Cafe"
      },
      sunset: "Kümbet Yaylası'ndan gün batımı"
    },
    kultur: {
      places: placesData.turistik
        .filter(place => place.features.includes("Kültürel") || place.features.includes("Tarihi"))
        .slice(0, 3)
        .map(place => place.title),
      restaurants: {
        balik: restaurantsData.restoranlar
          .find(r => r.features.includes("Balık"))?.title || "Balıkçı Barınağı",
        yerel: restaurantsData.restoranlar
          .find(r => r.features.includes("Yöresel"))?.title || "Bohça Mantı",
        modern: restaurantsData.restoranlar
          .find(r => r.features.includes("Cafe"))?.title || "Yıldız Cafe Restaurant"
      },
      sunset: "Sahil yürüyüş yolundan gün batımı"
    },
    deniz: {
      places: placesData.turistik
        .filter(place => place.features.includes("Deniz") || place.features.includes("Plaj"))
        .slice(0, 3)
        .map(place => place.title),
      restaurants: {
        balik: restaurantsData.restoranlar
          .find(r => r.features.includes("Balık"))?.title || "Şoray Balık Lokantası",
        yerel: restaurantsData.restoranlar
          .find(r => r.features.includes("Sahil"))?.title || "Yıldız Cafe Restaurant",
        modern: restaurantsData.restoranlar
          .find(r => r.features.includes("Modern"))?.title || "Grava Lounge"
      },
      sunset: "Plajdan gün batımı"
    }
  };

  const generatePlan = () => {
    const selectedPlan = plans[plan.preference];
    
    // İlçeye göre filtreleme
    const filteredPlaces = selectedPlan.places.filter((place: string) => {
      const placeData = placesData.turistik.find(p => p.title === place);
      return placeData?.district?.toLowerCase() === plan.selectedDistrict;
    });

    // Mesafeye göre optimizasyon (eğer varsa location bilgisini kullan)
    const optimizedPlaces = filteredPlaces.sort((a: string, b: string) => {
      const placeA = placesData.turistik.find(p => p.title === a);
      const placeB = placesData.turistik.find(p => p.title === b);
      
      // Location bilgisinden yaklaşık bir mesafe hesabı
      const getDistance = (place: any) => {
        if (!place?.location) return 0;
        // Merkez noktasından uzaklığa göre basit bir sıralama
        return place.location.includes("Merkez") ? 0 : 1;
      };

      return getDistance(placeA) - getDistance(placeB);
    });

    // Gün sayısına göre yer sayısını ayarlama
    const placesPerDay = Math.ceil(optimizedPlaces.length / plan.numberOfDays);
    const finalPlaces = optimizedPlaces.slice(0, placesPerDay * plan.numberOfDays);

    setGeneratedPlan({
      ...selectedPlan,
      places: finalPlaces,
      dailyPlans: Array.from({ length: plan.numberOfDays }, (_, i) => ({
        day: i + 1,
        places: finalPlaces.slice(i * placesPerDay, (i + 1) * placesPerDay)
      }))
    });
    setShowPlan(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              className="text-green-700 hover:text-green-900 hover:bg-green-50"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </div>

          <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">
            Gezi Planı Oluşturucu
          </h1>

          <AnimatePresence mode="wait">
            {!showPlan ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="mb-8 border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-6">
                    {step === 1 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Nasıl bir gezi tercih edersiniz?</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant={plan.preference === "tarihi" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, preference: "tarihi" })}
                            className={`h-24 ${
                              plan.preference === "tarihi" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Building className="h-6 w-6 mb-2 mx-auto" />
                              <span>Tarihi Yerler</span>
                            </div>
                          </Button>
                          <Button
                            variant={plan.preference === "dogal" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, preference: "dogal" })}
                            className={`h-24 ${
                              plan.preference === "dogal" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <TreePine className="h-6 w-6 mb-2 mx-auto" />
                              <span>Doğal Güzellikler</span>
                            </div>
                          </Button>
                          <Button
                            variant={plan.preference === "kultur" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, preference: "kultur" })}
                            className={`h-24 ${
                              plan.preference === "kultur" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Palmtree className="h-6 w-6 mb-2 mx-auto" />
                              <span>Kültürel Mekanlar</span>
                            </div>
                          </Button>
                          <Button
                            variant={plan.preference === "deniz" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, preference: "deniz" })}
                            className={`h-24 ${
                              plan.preference === "deniz" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Waves className="h-6 w-6 mb-2 mx-auto" />
                              <span>Deniz Aktiviteleri</span>
                            </div>
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Hangi ilçede gezmek istersiniz?</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          <Button
                            variant={plan.selectedDistrict === "merkez" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, selectedDistrict: "merkez" })}
                            className={`h-20 ${
                              plan.selectedDistrict === "merkez" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <span>Merkez</span>
                          </Button>
                          <Button
                            variant={plan.selectedDistrict === "bulancak" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, selectedDistrict: "bulancak" })}
                            className={`h-20 ${
                              plan.selectedDistrict === "bulancak" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <span>Bulancak</span>
                          </Button>
                          <Button
                            variant={plan.selectedDistrict === "gorele" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, selectedDistrict: "gorele" })}
                            className={`h-20 ${
                              plan.selectedDistrict === "gorele" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <span>Görele</span>
                          </Button>
                          <Button
                            variant={plan.selectedDistrict === "tirebolu" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, selectedDistrict: "tirebolu" })}
                            className={`h-20 ${
                              plan.selectedDistrict === "tirebolu" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <span>Tirebolu</span>
                          </Button>
                          <Button
                            variant={plan.selectedDistrict === "espiye" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, selectedDistrict: "espiye" })}
                            className={`h-20 ${
                              plan.selectedDistrict === "espiye" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <span>Espiye</span>
                          </Button>
                          <Button
                            variant={plan.selectedDistrict === "kesap" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, selectedDistrict: "kesap" })}
                            className={`h-20 ${
                              plan.selectedDistrict === "kesap" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <span>Keşap</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Kaç günlük bir gezi planlıyorsunuz?</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((day) => (
                            <Button
                              key={day}
                              variant={plan.numberOfDays === day ? "default" : "outline"}
                              onClick={() => setPlan({ ...plan, numberOfDays: day })}
                              className={`h-20 ${
                                plan.numberOfDays === day 
                                  ? "bg-green-700 hover:bg-green-800 text-white" 
                                  : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                              }`}
                            >
                              <span>{day} Gün</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Tercih ettiğiniz zorluk seviyesi nedir?</h2>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            variant={plan.difficultyLevel === "kolay" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, difficultyLevel: "kolay" })}
                            className={`h-20 ${
                              plan.difficultyLevel === "kolay" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <span>Kolay</span>
                              <p className="text-xs mt-1">Rahat yürüyüş</p>
                            </div>
                          </Button>
                          <Button
                            variant={plan.difficultyLevel === "orta" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, difficultyLevel: "orta" })}
                            className={`h-20 ${
                              plan.difficultyLevel === "orta" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <span>Orta</span>
                              <p className="text-xs mt-1">Biraz yürüyüş</p>
                            </div>
                          </Button>
                          <Button
                            variant={plan.difficultyLevel === "zor" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, difficultyLevel: "zor" })}
                            className={`h-20 ${
                              plan.difficultyLevel === "zor" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <span>Zor</span>
                              <p className="text-xs mt-1">Yoğun aktivite</p>
                            </div>
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      {step > 1 && (
                        <Button 
                          onClick={() => setStep(step - 1)}
                          className="bg-green-700 hover:bg-green-800 text-white"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Geri
                        </Button>
                      )}
                      {step < 4 ? (
                        <Button 
                          className="ml-auto bg-green-700 hover:bg-green-800 text-white" 
                          onClick={() => setStep(step + 1)}
                        >
                          İleri
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button 
                          className="ml-auto bg-green-700 hover:bg-green-800 text-white" 
                          onClick={generatePlan}
                        >
                          Planı Oluştur
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="plan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="border-green-100 shadow-lg">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 text-green-800">
                      {plan.numberOfDays} Günlük Gezi Planınız - {plan.selectedDistrict.charAt(0).toUpperCase() + plan.selectedDistrict.slice(1)}
                    </h2>
                    
                    <div className="space-y-6">
                      {generatedPlan.dailyPlans.map((dayPlan: any, dayIndex: number) => (
                        <div key={dayIndex} className="border-b pb-4 last:border-b-0">
                          <h3 className="text-lg font-semibold text-green-700 mb-4">
                            {dayIndex + 1}. Gün
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium text-green-600 mb-2">📍 Gezilecek Yerler</h4>
                              <div className="space-y-2">
                                {dayPlan.places.map((place: string, index: number) => (
                                  <div key={index} className="flex items-center gap-2 text-gray-600">
                                    <span className="font-medium">{index + 1}.</span>
                                    {place}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-green-600 mb-2">🍽️ Önerilen Restaurant</h4>
                              <p className="text-gray-600">
                                {generatedPlan.restaurants[plan.restaurantType]}
                              </p>
                            </div>

                            {plan.wantsSunset && dayIndex === generatedPlan.dailyPlans.length - 1 && (
                              <div>
                                <h4 className="font-medium text-green-600 mb-2">🌅 Gün Batımı</h4>
                                <p className="text-gray-600">
                                  {generatedPlan.sunset}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Harita yerine buton ekleyelim */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-green-700 mb-4">
                        🗺️ Rota
                      </h3>
                      <Button
                        onClick={() => {
                          // Tüm lokasyonları birleştirip Google Maps'e gönderelim
                          const locations = generatedPlan.places.join('|');
                          const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(generatedPlan.places[generatedPlan.places.length - 1])}&waypoints=${encodeURIComponent(locations)}&travelmode=driving`;
                          window.open(url, '_blank');
                        }}
                        className="w-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center gap-2 py-3"
                      >
                        <Map className="h-5 w-5" />
                        Google Haritalar'da Rotayı Görüntüle
                      </Button>
                    </div>

                    {/* Paylaşım butonları */}
                    <SharePlan plan={{
                      places: generatedPlan.places,
                      restaurant: generatedPlan.restaurants[plan.restaurantType],
                      sunset: plan.wantsSunset ? generatedPlan.sunset : undefined
                    }} />

                    <div className="mt-8 flex justify-center">
                      <Button 
                        onClick={() => {
                          setShowPlan(false);
                          setGeneratedPlan(null);
                          setStep(1);
                        }}
                        className="bg-green-700 hover:bg-green-800 text-white"
                      >
                        Yeni Plan Oluştur
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 