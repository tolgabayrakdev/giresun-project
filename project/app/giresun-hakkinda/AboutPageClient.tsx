"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Users, MapPin, Cloud, Mountain, Ship, Coffee } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// İlçe bilgileri için type
type District = {
  name: string;
  population: number;
  info: string;
  features: string[];
};

// İlçe verileri
const districts: District[] = [
  {
    name: "Merkez",
    population: 134825,
    info: "Şehrin idari merkezi, tarihi kalesi ve limanıyla öne çıkar.",
    features: ["Giresun Kalesi", "Liman", "Zeytinlik Mahallesi"]
  },
  {
    name: "Alucra",
    population: 9234,
    info: "Yüksek rakımlı platoları ve geleneksel yaşam tarzıyla dikkat çeker.",
    features: ["Yaylalar", "Kültürel Miras", "El Sanatları"]
  },
  {
    name: "Bulancak",
    population: 64573,
    info: "Fındık üretimi ve sahil şeridiyle ünlü ilçe.",
    features: ["Sahil", "Fındık Bahçeleri", "Plajlar"]
  },
  {
    name: "Çamoluk",
    population: 6789,
    info: "Doğal güzellikleri ve yaylaları ile öne çıkan dağlık ilçe.",
    features: ["Dağ Turizmi", "Yayla", "Doğal Yaşam"]
  },
  {
    name: "Çanakçı",
    population: 6543,
    info: "Yeşil doğası ve geleneksel yaşam tarzıyla bilinen ilçe.",
    features: ["Doğa", "Organik Tarım", "Kırsal Turizm"]
  },
  {
    name: "Dereli",
    population: 18765,
    info: "Kuzalan Şelalesi ve doğal güzellikleriyle meşhur.",
    features: ["Kuzalan Şelalesi", "Yaylalar", "Doğa Sporları"]
  },
  {
    name: "Doğankent",
    population: 6234,
    info: "Hidroelektrik santrali ve doğal güzellikleriyle tanınır.",
    features: ["HES", "Doğa", "Tarım"]
  },
  {
    name: "Espiye",
    population: 28934,
    info: "Yaylaları ve doğal güzellikleriyle dikkat çeker.",
    features: ["Yaylalar", "Doğa Turizmi", "Fındık"]
  },
  {
    name: "Eynesil",
    population: 13567,
    info: "Sahil şeridi ve balıkçılığıyla ünlü ilçe.",
    features: ["Balıkçılık", "Plajlar", "Sahil"]
  },
  {
    name: "Görele",
    population: 31245,
    info: "Meşhur Görele peyniri ve doğal güzellikleriyle tanınır.",
    features: ["Görele Peyniri", "Balıkçılık", "El Sanatları"]
  },
  {
    name: "Güce",
    population: 7654,
    info: "Ormanları ve doğal yaşamıyla öne çıkan ilçe.",
    features: ["Orman", "Ekoturizm", "Doğal Yaşam"]
  },
  {
    name: "Keşap",
    population: 19876,
    info: "Sahil şeridi ve tarihi yapılarıyla dikkat çeker.",
    features: ["Sahil", "Tarihi Yapılar", "Fındık"]
  },
  {
    name: "Piraziz",
    population: 13987,
    info: "Sahil turizmi ve tarımsal üretimiyle öne çıkar.",
    features: ["Plajlar", "Tarım", "Balıkçılık"]
  },
  {
    name: "Şebinkarahisar",
    population: 20123,
    info: "Tarihi kalesi ve yüksek rakımlı coğrafyasıyla ünlü.",
    features: ["Tarihi Kale", "Yüksek Rakım", "Kültürel Miras"]
  },
  {
    name: "Tirebolu",
    population: 30156,
    info: "Tarihi kalesi ve balıkçılığıyla ünlü sahil ilçesi.",
    features: ["Tirebolu Kalesi", "Balıkçı Limanı", "Plajlar"]
  },
  {
    name: "Yağlıdere",
    population: 15432,
    info: "Doğal güzellikleri ve geleneksel yaşam tarzıyla bilinir.",
    features: ["Doğal Yaşam", "Kırsal Turizm", "Tarım"]
  }
];

const historicalEvents = [
  {
    period: "Antik Dönem",
    year: "M.Ö. 2000-546",
    description: "Bölgede ilk yerleşimler Hititlere kadar uzanır. Daha sonra Miletoslular tarafından 'Kerasous' (Kiraz Şehri) adıyla bir koloni kenti kurulmuştur. Amazon Krallığı'nın önemli yerleşim yerlerinden biri olmuştur.",
    events: ["Hitit Yerleşimi", "Milet Kolonisi", "Amazon Krallığı", "Kiraz Ticareti"]
  },
  {
    period: "Roma ve Bizans Dönemi",
    year: "M.Ö. 1 - M.S. 1461",
    description: "Pontus Krallığı'nın önemli bir parçası olan şehir, Roma İmparatorluğu ve ardından Bizans hakimiyetinde önemli bir liman kenti olarak gelişmiştir. Doğu Roma İmparatorluğu döneminde önemli bir ticaret merkezi haline gelmiştir.",
    events: ["Pontus Krallığı", "Roma Hakimiyeti", "Bizans Dönemi", "Liman Ticareti"]
  },
  {
    period: "Osmanlı Dönemi",
    year: "1461-1923",
    description: "Fatih Sultan Mehmet döneminde Osmanlı topraklarına katılan Giresun, önemli bir ticaret ve kültür merkezi haline gelmiştir. 19. yüzyılda 'Vilayet-i Çepni' olarak anılan bölge, Çepni Türklerinin yoğun yerleşim alanı olmuştur. Fındık ticaretinin merkezi haline gelen şehir, ekonomik açıdan büyük gelişme göstermiştir.",
    events: ["Osmanlı Fethi", "Çepni Türkleri", "Fındık Ticareti", "Kültürel Gelişim"]
  },
  {
    period: "Milli Mücadele Dönemi",
    year: "1919-1923",
    description: "Milli Mücadele döneminde önemli bir rol oynayan Giresun'un en önemli şahsiyetlerinden Topal Osman Ağa, Mustafa Kemal Paşa'nın muhafız birliği komutanlığını yapmıştır. Pontus Rum çetelerine karşı verdiği mücadele ile tanınan Osman Ağa, bölgenin Türk hakimiyetinde kalmasında önemli rol oynamıştır.",
    events: ["Topal Osman Ağa", "Milli Mücadele", "Pontus Meselesi", "Muhafız Birliği"]
  },
  {
    period: "Cumhuriyet Dönemi",
    year: "1923-Günümüz",
    description: "Cumhuriyetin ilanıyla birlikte modern bir kent kimliği kazanan Giresun, fındık üretimi ve ticaretinde dünya lideri konumuna gelmiştir. Şehir, kültürel mirasını koruyarak endüstriyel ve turistik gelişimini sürdürmektedir. Karadeniz'in önemli liman kentlerinden biri olma özelliğini korumaktadır.",
    events: ["Şehirleşme", "Ekonomik Kalkınma", "Turizm Gelişimi", "Fındık İhracatı"]
  }
];

export default function AboutPageClient() {
  // Sayfanın client-side'da yüklendiğinden emin olmak için
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (!isClient) {
    return null; // veya loading state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Geri Dön Butonu */}
      <motion.div 
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white/90 backdrop-blur-sm hover:bg-white"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Hero Section */}
      <div className="bg-green-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Giresun Hakkında
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Karadeniz'in incisi Giresun, zengin tarihi, eşsiz doğası ve kültürel değerleriyle
            benzersiz bir şehirdir.
          </p>
        </div>
      </div>

      {/* Genel Bilgiler */}
      <motion.section 
        className="py-12 bg-white"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-green-900 mb-8"
            variants={itemVariants}
          >
            Genel Bilgiler
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Coğrafi Konum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Doğu Karadeniz Bölgesi'nde, 40° 21' ve 41° 08' kuzey enlemleri ile 37° 50' ve 39° 12' doğu boylamları arasında yer alır.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Nüfus (2023)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-700 mb-2">453.912</p>
                <p className="text-sm text-gray-600">16 ilçe, 537 köy</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-green-600" />
                  İklim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tipik Karadeniz iklimi: Ilıman ve yağışlı. Yıllık ortalama sıcaklık 14.5°C</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-green-600" />
                  Ekonomi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Fındık üretiminde dünya lideri. Tarım, turizm ve balıkçılık önemli gelir kaynakları.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Tarih Bölümü */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-green-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Tarihi Geçmiş
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-green-200 transform -translate-x-1/2" />
            <div className="space-y-12">
              {historicalEvents.map((event, index) => (
                <motion.div 
                  key={event.period}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-center md:items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-green-600 rounded-full transform -translate-x-1/2"></div>
                  
                  <div className="w-full md:w-5/12">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>
                          <span className="text-xl text-green-800">{event.period}</span>
                          <span className="block text-sm text-gray-500 mt-1">{event.year}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {event.events.map((item) => (
                            <span
                              key={item}
                              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* İlçeler */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-green-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            İlçeler
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {districts.map((district, index) => (
              <motion.div
                key={district.name}
                variants={cardVariants}
                custom={index}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{district.name}</span>
                      <span className="text-sm text-gray-500">
                        {district.population.toLocaleString()} kişi
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{district.info}</p>
                    <div className="flex flex-wrap gap-2">
                      {district.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-8">Öne Çıkan Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Ship className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fındık Üretimi</h3>
              <p className="text-gray-600">
                Dünya fındık üretiminin %25'ini karşılayan şehir, "Fındık Diyarı" olarak anılır.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Mountain className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Yaylalar</h3>
              <p className="text-gray-600">
                Kümbet, Bektaş, Kulakkaya gibi yaylalarıyla doğa turizminin önemli merkezlerinden.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <Info className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tarihi Miras</h3>
              <p className="text-gray-600">
                2 bin yıllık tarihi, kaleleri ve antik yerleşimleriyle zengin bir kültürel mirasa sahip.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 