"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, ShoppingBag, Utensils, Trees, Coffee, Mountain, Ship, Menu, Building2, Instagram, Twitter, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { i } from "framer-motion/client";

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
      image: "/turist/giresun-kalesi.jpeg",
      location: "Merkez",
    },
    {
      title: "Giresun Adası",
      description: "Doğu Karadeniz'in tek adası, antik dönem kalıntıları ve doğal güzelliği ile öne çıkar.",
      image: "/turist/giresun-adasi.jpg",
      location: "Merkez sahil",
    },
    {
      title: "Kümbet Yaylası",
      description: "1800 metre yükseklikte, yeşilin her tonunu barındıran, şenlikleriyle ünlü yayla.",
      image: "/turist/kumbet-yaylasi.jpg",
      location: "Merkeze 40 km",
    },
    {
      title: "Zeytinlik Mahallesi",
      description: "Tarihi Giresun evlerinin bulunduğu, nostaljik sokakları ile ünlü mahalle.",
      image: "/turist/zeytinlik-mahallesi.jpg",
      location: "Merkez",
    },
    {
      title: "Mavi Göl",
      description: "Dereli ilçesinde bulunan doğal güzelliği ile büyüleyen göl. Kesinlikle ziyaret etmelisiniz.",
      image: "/turist/mavi-gol.jpg",
      location: "Dereli",
    },
  ],
  restoranlar: [
    {
      title: "Çıtır Balık",
      description: "Taze Karadeniz balıkları ve meze çeşitleri.",
      image: "/restaurant/balik-izgara.jpg",
      location: "Sahil yolu",
    },
    {
      title: "Karadeniz Pide Salonu",
      description: "Geleneksel Giresun pidesi ve kaygana.",
      image: "/restaurant/lahmacun.jpg",
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
    {
      title: "Hazal Pide Lahmacun",
      description: "Lahmacun ve pide çeşitleri",
      image: "/api/placeholder/400/300",
      location: "Merkez",
    }
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Arka plan deseni */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-800/90" />
          <div className="absolute inset-0 backdrop-blur-sm" />
          <div 
            className="absolute inset-0 opacity-10 text-white select-none pointer-events-none"
            style={{
              backgroundImage: "url('/patterns/findik-pattern.png')",
              backgroundSize: "500px",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="absolute -right-20 top-20 text-[20rem] font-bold text-white/5 rotate-12 select-none pointer-events-none">
            GİRESUN
          </div>
        </div>

        {/* İçerik */}
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-3xl mx-auto text-center text-white space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Karadeniz'in İncisi <br />
              <span className="text-green-300">Giresun</span>'u Keşfedin
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Fındığın başkenti, yaylaların cenneti, tarihin ve doğanın buluşma noktası
            </motion.p>

            {/* Fındık animasyonu */}
            <motion.div 
              className="flex justify-center gap-8 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.img
                src="/icons/findik-icon.png"
                alt="Fındık"
                className="w-16 h-16"
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-green-900 hover:bg-green-50 font-semibold"
                onClick={() => document.getElementById('kategoriler')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Keşfetmeye Başla
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent hover:bg-white/20 text-white border-2 border-white font-semibold"
                onClick={() => router.push('/about')}
              >
                Daha Fazla Bilgi
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
            animate={{
              y: [0, 5, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1 h-2 bg-white/50 rounded-full mx-auto" />
          </motion.div>
        </motion.div>
      </section>

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
                <p className="text-sm text-gray-500">20-23 Mayıs 2025</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Geleneksel hale gelen festivalde konserler, yöresel ürünler ve kültürel etkinlikler.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Fındık Hasadı Şenliği</CardTitle>
                <p className="text-sm text-gray-500">15-20 Ağustos 2025</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fındık hasadı kutlamaları, yerel müzik ve dans gösterileri.</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Yayla Şenlikleri</CardTitle>
                <p className="text-sm text-gray-500">Temmuz-Ağustos 2025</p>
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

      {/* Kategori Butonları Section'ı */}
      <section id="kategoriler" className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Kategorilere Göz Atın</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Giresun'un tüm güzelliklerini keşfetmek için aşağıdaki kategorilerden birini seçin ve yolculuğunuza başlayın
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button 
                variant="outline" 
                className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-green-50 border-2 hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.location.href = '/turistik'}
              >
                <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                  <Camera className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-lg block">Gezilecek Yerler</span>
                  <span className="text-sm text-gray-500 block">Tarihi ve Doğal Güzellikler</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-green-50 border-2 hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.location.href = '/restoranlar'}
              >
                <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                  <Utensils className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-lg block">Restoranlar</span>
                  <span className="text-sm text-gray-500 block">Yerel Lezzetler</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                variant="outline" 
                className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-green-50 border-2 hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.location.href = '/yaylalar'}
              >
                <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                  <Mountain className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-lg block">Yaylalar</span>
                  <span className="text-sm text-gray-500 block">Doğa ve Huzur</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="outline" 
                className="w-full h-40 flex flex-col items-center justify-center gap-3 hover:bg-green-50 border-2 hover:border-green-500 hover:shadow-lg transition-all duration-300 group"
                onClick={() => window.location.href = '/festivaller'}
              >
                <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                  <Music className="h-8 w-8 text-green-600" />
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-lg block">Festivaller</span>
                  <span className="text-sm text-gray-500 block">Etkinlik ve Şenlikler</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Öne Çıkan Yerler */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-4">Öne Çıkan Deneyimler</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Giresun'un eşsiz doğası, tarihi ve kültürel zenginlikleri ile unutulmaz anılar biriktirin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="relative rounded-lg overflow-hidden h-[300px] group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => router.push('/turistik')}
          >
            <img 
              src="/turist/giresun-kalesi.jpeg" 
              alt="Tarihi Yerler"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">Tarihi Keşfet</h3>
              <p className="text-gray-200 text-sm">2000 yıllık tarihi, kaleleri ve antik yerleşimleri ile zamanda yolculuğa çıkın</p>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden h-[300px] group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push('/yaylalar')}
          >
            <img 
              src="/turist/kumbet-yaylasi.jpg" 
              alt="Doğal Güzellikler"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">Doğayla Buluş</h3>
              <p className="text-gray-200 text-sm">Yemyeşil yaylaları, şelaleleri ve eşsiz manzaraları ile doğanın kalbine yolculuk</p>
            </div>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden h-[300px] group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => router.push('/restoranlar')}
          >
            <img 
              src="/restaurant/balik-izgara.jpg" 
              alt="Yerel Lezzetler"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">Lezzetleri Tat</h3>
              <p className="text-gray-200 text-sm">Karadeniz mutfağının eşsiz lezzetleri ve yerel tatları ile gastronomi yolculuğu</p>
            </div>
          </motion.div>
        </div>
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
                tolgabayrakj@gmail.com<br />
                +90 00 000 00 
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
            <p>© 2025 Giresun Şehir Rehberi. Tüm hakları saklıdır. @tolgabayrak</p>
          </div>
        </div>
      </footer>
    </div>
  );
}