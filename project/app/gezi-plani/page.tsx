"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, MapPin, Coffee, Sunset, TreePine, Palmtree, Building, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import placesData from '@/data/places.json';
import restaurantsData from '@/data/restaurants.json';
import plateausData from '@/data/plateaus.json';

type TripPreference = "tarihi" | "dogal" | "kultur" | "deniz";
type TimeOfDay = "sabah" | "ogle" | "aksam";
type RestaurantType = "balik" | "yerel" | "modern";

interface TripPlan {
  preference: TripPreference;
  timeOfDay: TimeOfDay;
  duration: number;
  restaurantType: RestaurantType;
  wantsSunset: boolean;
}

export default function TripPlannerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<TripPlan>({
    preference: "tarihi",
    timeOfDay: "sabah",
    duration: 4,
    restaurantType: "yerel",
    wantsSunset: true
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
    setGeneratedPlan(selectedPlan);
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
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Günün hangi saatinde başlamak istersiniz?</h2>
                        <Select
                          value={plan.timeOfDay}
                          onValueChange={(value: TimeOfDay) => setPlan({ ...plan, timeOfDay: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Bir zaman seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sabah">Sabah (09:00)</SelectItem>
                            <SelectItem value="ogle">Öğle (12:00)</SelectItem>
                            <SelectItem value="aksam">Akşam (15:00)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Yemek tercihiniz nedir?</h2>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            variant={plan.restaurantType === "balik" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, restaurantType: "balik" })}
                            className={`h-24 ${
                              plan.restaurantType === "balik" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Coffee className="h-6 w-6 mb-2 mx-auto" />
                              <span>Balık Restoranı</span>
                            </div>
                          </Button>
                          <Button
                            variant={plan.restaurantType === "yerel" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, restaurantType: "yerel" })}
                            className={`h-24 ${
                              plan.restaurantType === "yerel" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Coffee className="h-6 w-6 mb-2 mx-auto" />
                              <span>Yerel Lezzetler</span>
                            </div>
                          </Button>
                          <Button
                            variant={plan.restaurantType === "modern" ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, restaurantType: "modern" })}
                            className={`h-24 ${
                              plan.restaurantType === "modern" 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Coffee className="h-6 w-6 mb-2 mx-auto" />
                              <span>Modern Kafeler</span>
                            </div>
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold mb-4 text-green-800">Gün batımını izlemek ister misiniz?</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant={plan.wantsSunset ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, wantsSunset: true })}
                            className={`h-24 ${
                              plan.wantsSunset 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Sunset className="h-6 w-6 mb-2 mx-auto" />
                              <span>Evet, harika olur!</span>
                            </div>
                          </Button>
                          <Button
                            variant={!plan.wantsSunset ? "default" : "outline"}
                            onClick={() => setPlan({ ...plan, wantsSunset: false })}
                            className={`h-24 ${
                              !plan.wantsSunset 
                                ? "bg-green-700 hover:bg-green-800 text-white" 
                                : "border-green-200 hover:border-green-300 text-green-700 hover:text-green-800"
                            }`}
                          >
                            <div className="text-center">
                              <Clock className="h-6 w-6 mb-2 mx-auto" />
                              <span>Hayır, teşekkürler</span>
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
                    <h2 className="text-2xl font-semibold mb-6 text-green-800">İşte Size Özel Gezi Planınız!</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          📍 Gezilecek Yerler
                        </h3>
                        <div className="space-y-2">
                          {generatedPlan.places.map((place: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 text-gray-600">
                              <span className="font-medium">{index + 1}.</span>
                              {place}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-green-700 mb-2">
                          🍽️ Önerilen Restaurant
                        </h3>
                        <p className="text-gray-600">
                          {generatedPlan.restaurants[plan.restaurantType]}
                        </p>
                      </div>

                      {plan.wantsSunset && (
                        <div>
                          <h3 className="text-lg font-semibold text-green-700 mb-2">
                            🌅 Gün Batımı
                          </h3>
                          <p className="text-gray-600">
                            {generatedPlan.sunset}
                          </p>
                        </div>
                      )}
                    </div>

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