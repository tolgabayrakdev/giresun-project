"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, ShoppingBag, Utensils, Trees, Coffee, Mountain, Ship, Menu, Building2, Instagram, Twitter, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Sadeleştirilmiş animasyon variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // 0.2'den 0.1'e düşürdük
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 }, // y değerini 20'den 10'a düşürdük
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5 // Daha hızlı geçiş
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.02, // 1.05'ten 1.02'ye düşürdük
    transition: {
      duration: 0.2
    }
  }
};

const categories = {
  turistik: [
    {
      title: "Giresun Kalesi",
      description: "Şehre hakim tepede yer alan tarihi kale, muhteşem manzarası ile ünlüdür.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    },
    {
      title: "Giresun Adası",
      description: "Doğu Karadeniz'in tek adası, antik dönem kalıntıları ve doğal güzelliği ile öne çıkar.",
      image: "/api/placeholder/400/300",
      location: "Merkez sahil",
    },
    {
      title: "Kümbet Yaylası",
      description: "1800 metre yükseklikte, yeşilin her tonunu barındıran, şenlikleriyle ünlü yayla.",
      image: "/api/placeholder/400/300",
      location: "Merkeze 40 km",
    },
    {
      title: "Zeytinlik Mahallesi",
      description: "Tarihi Giresun evlerinin bulunduğu, nostaljik sokakları ile ünlü mahalle.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    },
    {
      title: "Mavi Göl",
      description: "Dereli ilçesinde bulunan doğal güzelliği ile büyüleyen göl.",
      image: "/api/placeholder/400/300",
      location: "Dereli",
    },
  ],
  restoranlar: [
    {
      title: "Çıtır Balık",
      description: "Taze Karadeniz balıkları ve meze çeşitleri.",
      image: "/api/placeholder/400/300",
      location: "Sahil yolu",
    },
    {
      title: "Karadeniz Pide Salonu",
      description: "Geleneksel Giresun pidesi ve kaygana.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    },
    {
      title: "Liman Restaurant",
      description: "Deniz manzaralı, taze balık ve mezeler sunan restoran.",
      image: "/api/placeholder/400/300",
      location: "Sahil",
    },
    {
      title: "Fındık Cafe",
      description: "Yöresel tatlılar ve fındıklı lezzetler.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    },
  ],
  yaylalar: [
    {
      title: "Bektaş Yaylası",
      description: "Doğal güzellikleri ve temiz havasıyla ünlü, kamp ve trekking için ideal yayla.",
      image: "/api/placeholder/400/300",
      location: "Dereli",
    },
    {
      title: "Kulakkaya Yaylası",
      description: "Kış sporları ve doğa yürüyüşleri için popüler, eşsiz manzaralı yayla.",
      image: "/api/placeholder/400/300",
      location: "Dereli",
    },
  ],
  festivaller: [
    {
      title: "Aksu Festivali",
      description: "Her yıl Mayıs ayında düzenlenen, müzik, kültür ve sanat etkinliklerinin buluştuğu festival.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    },
    {
      title: "Fındık Festivali",
      description: "Ağustos ayında düzenlenen, fındık hasadını kutlayan geleneksel festival.",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    },
    {
      title: "Yayla Şenlikleri",
      description: "Yaz aylarında yaylalarda düzenlenen geleneksel horon ve müzik şenlikleri.",
      image: "/api/placeholder/400/300",
      location: "Çeşitli Yaylalar",
    },
  ],
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/90" />
        <div className="relative min-h-[400px] md:h-[600px] flex items-center"
          style={{
            backgroundImage: "url('/api/placeholder/1920/1080')",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}>
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-2xl text-white space-y-4 md:space-y-6 py-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold leading-tight"
                variants={itemVariants}
              >
                Karadeniz'in Yeşil İncisi
                <motion.span 
                  className="block text-5xl md:text-6xl mt-2"
                  variants={itemVariants}
                >
                  GİRESUN
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-100"
                variants={itemVariants}
              >
                Eşsiz doğası, tarihi yapıları, yaylaları ve fındığıyla
                keşfedilmeyi bekleyen şehir
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-3"
                variants={itemVariants}
              >
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Rehberi Keşfet
                </Button>
                <Button 
                  size="lg" 
                  className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-semibold"
                  onClick={() => router.push('/about')}
                >
                  Daha Fazla Bilgi
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* İstatistikler */}
      <section className="py-12 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "1500+", text: "Yıllık Tarih" },
              { number: "12", text: "Popüler Yayla" },
              { number: "16", text: "İlçe" },
              { number: "%25", text: "Dünya Fındık Üretimi" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="space-y-2"
                variants={itemVariants}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-bold"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-300">{stat.text}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Yeni Section: Öne Çıkan Etkinlikler */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">Yaklaşan Etkinlikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Aksu Festivali</CardTitle>
                <p className="text-sm text-gray-500">20-23 Mayıs 2024</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Geleneksel hale gelen festivalde konserler, yöresel ürünler ve kültürel etkinlikler.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Fındık Hasadı Şenliği</CardTitle>
                <p className="text-sm text-gray-500">15-20 Ağustos 2024</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fındık hasadı kutlamaları, yerel müzik ve dans gösterileri.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Yayla Şenlikleri</CardTitle>
                <p className="text-sm text-gray-500">Temmuz-Ağustos 2024</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Kümbet ve Bektaş yaylalarında geleneksel şenlikler ve horon gösterileri.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Özellikler - Mobil Grid */}
      <section className="py-8 md:py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-2">
                <Mountain className="h-8 w-8 md:h-12 md:w-12 text-green-600" />
                <CardTitle className="text-lg md:text-xl">Yaylalar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Kümbet, Bektaş ve daha birçok yayla ile doğanın kalbinde unutulmaz deneyimler
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-2">
                <Coffee className="h-8 w-8 md:h-12 md:w-12 text-green-600" />
                <CardTitle className="text-lg md:text-xl">Yerel Lezzetler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Fındık ürünleri, Giresun pidesi ve yöresel tatlar
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-2">
                <Ship className="h-8 w-8 md:h-12 md:w-12 text-green-600" />
                <CardTitle className="text-lg md:text-xl">Ada Turu</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Giresun Adası'na tekne turları ve tarihi keşif
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="space-y-2">
                <Trees className="h-8 w-8 md:h-12 md:w-12 text-green-600" />
                <CardTitle className="text-lg md:text-xl">Doğa Sporları</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  Trekking, kamp ve doğa yürüyüşü aktiviteleri
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Kategori Butonları Section'ı ekleyelim */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-green-900">Kategorilere Göz Atın</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-green-50 border-2"
              onClick={() => window.location.href = '/turistik'}
            >
              <Camera className="h-8 w-8 text-green-600" />
              <span>Gezilecek Yerler</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-green-50 border-2"
              onClick={() => window.location.href = '/restoranlar'}
            >
              <Utensils className="h-8 w-8 text-green-600" />
              <span>Restoranlar</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-green-50 border-2"
              onClick={() => window.location.href = '/yaylalar'}
            >
              <Mountain className="h-8 w-8 text-green-600" />
              <span>Yaylalar</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-green-50 border-2"
              onClick={() => window.location.href = '/festivaller'}
            >
              <Music className="h-8 w-8 text-green-600" />
              <span>Festivaller</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Ana İçerik - Mobil Uyumlu Tabs */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-4">Giresun'u Keşfedin</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tarihi yerlerden doğal güzelliklere, yerel lezzetlerden festivallere kadar 
            Giresun'un en güzel deneyimlerini keşfedin
          </p>
        </div>

        <Tabs defaultValue="turistik" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="turistik" className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
              <Camera className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Tarihi Yerler</span>
              <span className="sm:hidden">Tarih</span>
            </TabsTrigger>
            <TabsTrigger value="yaylalar" className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
              <Mountain className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Yaylalar</span>
              <span className="sm:hidden">Yayla</span>
            </TabsTrigger>
            <TabsTrigger value="restoranlar" className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
              <Utensils className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Lezzetler</span>
              <span className="sm:hidden">Yemek</span>
            </TabsTrigger>
            <TabsTrigger value="festivaller" className="flex items-center gap-1 md:gap-2 text-xs md:text-base">
              <Music className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Festivaller</span>
              <span className="sm:hidden">Etkinlik</span>
            </TabsTrigger>
          </TabsList>

          {Object.entries(categories).map(([key, items]) => (
            <TabsContent key={key} value={key}>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                  >
                    <Card className="overflow-hidden">
                      <div className="relative">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg md:text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm md:text-base text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{item.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Mobil Uyumlu Footer */}
      <footer className="bg-green-900 text-white mt-8 md:mt-12">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">Giresun Şehir Rehberi</h3>
              <p className="text-sm md:text-base text-gray-300">
                Karadeniz'in incisi Giresun'u keşfetmek için en kapsamlı rehber
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">İletişim</h3>
              <p className="text-sm md:text-base text-gray-300">
                info@giresunrehberi.com<br />
                +90 454 123 45 67
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">Takip Edin</h3>
              <div className="flex justify-center sm:justify-start gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white/20"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-transparent text-white border-2 border-white hover:bg-white/20"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm md:text-base text-gray-300">
            <p>© 2025 Giresun Şehir Rehberi. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}