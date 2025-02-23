"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, ShoppingBag, Utensils, Trees, Coffee, Mountain, Ship, Menu, Building2, Instagram, Twitter, Music, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Sadeleştirilmiş animasyon variants
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
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};


export default function Home() {
  const router = useRouter();

  // SSS verilerini tanımlayalım
  const faqs = [
    {
      question: "Giresun nerede bulunuyor?",
      answer: "Giresun, Türkiye'nin Karadeniz Bölgesi'nde yer alan bir sahil şehridir. Doğusunda Trabzon, batısında Ordu, güneyinde Sivas ve Erzincan illeri ile komşudur. Karadeniz sahil şeridinde yaklaşık 121 km'lik bir kıyı şeridine sahiptir."
    },
    {
      question: "Giresun'un meşhur yemekleri nelerdir?",
      answer: "Giresun'un başlıca meşhur yemekleri arasında: Karalahana çorbası, Pide çeşitleri, Kiremitte Balık, Karalahana sarması, Mısır ekmeği, Kuymak (Muhlama), Giresun Dondurması ve fındıklı tatlılar bulunur. Ayrıca taze Karadeniz balıkları da mutlaka tadılması gereken lezzetler arasındadır."
    },
    {
      question: "Giresun'a nasıl ulaşabilirim?",
      answer: "Giresun-Ordu Havalimanı üzerinden uçakla, karayolu ile şehirlerarası otobüslerle veya özel araçla ulaşım sağlanabilir. Havalimanı şehir merkezine yaklaşık 50 km uzaklıktadır. Ayrıca şehirlerarası otobüs terminali şehir merkezine yakın bir konumda bulunmaktadır."
    },
    {
      question: "Giresun'da görülmesi gereken yerler nerelerdir?",
      answer: "Başlıca görülmesi gereken yerler: Giresun Kalesi, Giresun Adası (Karadeniz'in tek adası), Zeytinlik Mahallesi (tarihi evleri), Kümbet Yaylası, Kulakkaya Yaylası, Giresun Müzesi, Meryem Ana Manastırı ve sahil şeridi. Ayrıca şehir merkezindeki tarihi camiler ve çarşılar da gezilmeye değerdir."
    },
    {
      question: "Giresun'da hangi mevsimde gidilmeli?",
      answer: "Giresun'u ziyaret etmek için en ideal dönem Mayıs-Eylül ayları arasıdır. Yaz aylarında yaylalar ziyaret edilebilir, denize girilebilir ve çeşitli festivallere katılabilirsiniz. Ağustos ayı fındık hasadı nedeniyle ayrıca özel bir dönemdir."
    }
  ];

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
          <div className="absolute -right-20 top-20 text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold text-white/5 rotate-12 select-none pointer-events-none">
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
                src="/findik-icon.png"
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
                className="bg-transparent hover:bg-white/20 hover:text-white text-white border-2 border-white font-semibold"
                onClick={() => router.push('/giresun-hakkinda')}
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
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Öne Çıkan Deneyimler
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Giresun'un eşsiz doğası, tarihi ve kültürel zenginlikleri ile unutulmaz anılar biriktirin
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Tarihi Yerler Kartı */}
            <motion.div
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              variants={itemVariants}
            >
              <div className="relative h-[400px]">
                <img
                  src="/turist/giresun-kalesi.jpeg"
                  alt="Tarihi Yerler"
                  className="w-full h-full object-cover"
                />
                {/* Overlay - Normal durumda hafif gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-all duration-500 group-hover:opacity-0" />

                {/* Hover durumunda görünecek overlay */}
                <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Başlık - Her zaman görünür ama hover'da yukarı kayar */}
                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-280px]">
                  <h3 className="text-white text-2xl font-bold">Tarihi Keşfet</h3>
                </div>

                {/* İçerik - Hover'da görünür */}
                <div className="absolute inset-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-4">
                    <p className="text-white/90 text-base">
                      2000 yıllık tarihi, kaleleri ve antik yerleşimleri ile zamanda yolculuğa çıkın.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🏰 Kale Turu
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        📸 Fotoğraf Turu
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Yeni Kart: Kültür Turu */}
            <motion.div
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              variants={itemVariants}
            >
              <div className="relative h-[400px]">
                <img
                  src="/turist/zeytinlik-mahallesi.jpg"
                  alt="Kültür Turu"
                  className="w-full h-full object-cover"
                />
                {/* Overlay - Normal durumda hafif gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-all duration-500 group-hover:opacity-0" />

                {/* Hover durumunda görünecek overlay */}
                <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Başlık - Her zaman görünür ama hover'da yukarı kayar */}
                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-280px]">
                  <h3 className="text-white text-2xl font-bold">Kültür Turu</h3>
                </div>

                {/* İçerik - Hover'da görünür */}
                <div className="absolute inset-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-4">
                    <p className="text-white/90 text-base">
                      Zeytinlik Mahallesi'nde tarihi evler arasında yürüyüş ve yerel yaşamı keşfedin.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🏘️ Tarihi Evler
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🎨 Sanat Galerileri
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Doğa Deneyimi Kartı - Güncellendi */}
            <motion.div
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              variants={itemVariants}
            >
              <div className="relative h-[400px]">
                <img
                  src="/turist/kumbet-yaylasi.jpg"
                  alt="Doğal Güzellikler"
                  className="w-full h-full object-cover"
                />
                {/* Overlay - Normal durumda hafif gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-all duration-500 group-hover:opacity-0" />

                {/* Hover durumunda görünecek overlay */}
                <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Başlık - Her zaman görünür ama hover'da yukarı kayar */}
                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-280px]">
                  <h3 className="text-white text-2xl font-bold">Doğayla Buluş</h3>
                </div>

                {/* İçerik - Hover'da görünür */}
                <div className="absolute inset-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-4">
                    <p className="text-white/90 text-base">
                      Yemyeşil yaylalarda kamp yapın, doğa yürüyüşlerine katılın ve eşsiz manzaraların tadını çıkarın.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        ⛺ Kamp
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🥾 Trekking
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🏞️ Yayla Turu
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gastronomi Kartı */}
            <motion.div
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              variants={itemVariants}
            >
              <div className="relative h-[400px]">
                <img
                  src="/restaurant/balik-izgara.jpg"
                  alt="Yerel Lezzetler"
                  className="w-full h-full object-cover"
                />
                {/* Overlay - Normal durumda hafif gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-all duration-500 group-hover:opacity-0" />

                {/* Hover durumunda görünecek overlay */}
                <div className="absolute inset-0 bg-green-900/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Başlık - Her zaman görünür ama hover'da yukarı kayar */}
                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:translate-y-[-280px]">
                  <h3 className="text-white text-2xl font-bold">Lezzet Turu</h3>
                </div>

                {/* İçerik - Hover'da görünür */}
                <div className="absolute inset-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0">
                  <div className="space-y-4">
                    <p className="text-white/90 text-base">
                      Karadeniz mutfağının eşsiz lezzetlerini tadın, taze balık ve fındık ürünlerinin keyfini çıkarın.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🐟 Balık Restoranları
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🥜 Fındık Tadımı
                      </span>
                      <span className="px-3 py-1.5 bg-white/20 rounded-full text-sm text-white">
                        🍳 Yöresel Mutfak
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Öne Çıkan Deneyimler section'ından sonra */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-50 rounded-2xl p-8 md:p-12 shadow-lg border border-green-100">
              <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
                Kişisel Gezi Planınızı Oluşturun
              </h2>
              <p className="text-lg text-green-700 mb-8">
                Tercihlerinize göre özelleştirilmiş, günübirlik Giresun gezi planı oluşturmak için hemen başlayın.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex justify-center"
              >
                <Button
                  size="lg"
                  onClick={() => router.push('/gezi-plani')}
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold text-base md:text-lg px-4 md:px-8 py-4 md:py-6 h-auto flex items-center justify-center gap-2"
                >
                  <span className="hidden sm:inline">Gezi Planı Oluştur</span>
                  <span className="sm:hidden">Plan Oluştur</span>
                  <span className="text-xs">(Demo)</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SSS section'ı buradan devam eder */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Giresun hakkında merak edilen soruların cevaplarını bulun
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-green-800 hover:text-green-900">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Mobil Uyumlu Footer */}
      <footer className="bg-green-900 text-white mt-8 md:mt-12">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">giresunhakkinda.com</h3>
              <p className="text-sm md:text-base text-gray-300">
                Karadeniz'in incisi Giresun'u keşfetmek için en kapsamlı rehber
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">İletişim</h3>
              <p className="text-sm md:text-base text-gray-300">
                tolgabayrakj@gmail.com
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">Takip Edin</h3>
              <div className="flex justify-center sm:justify-start gap-4">
                <Button
                  onClick={() => router.push('https://www.instagram.com')}
                  variant="outline"
                  size="icon"
                  className="bg-transparent text-white border-2 border-white hover:bg-white"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent text-white border-2 border-white hover:bg-white"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold mb-4">Proje Hakkında</h3>
              <Button
                variant="link"
                className="text-gray-300 hover:text-white p-0 h-auto font-normal"
                onClick={() => router.push('/hakkimda')}
              >
                Bu projenin hikayesini keşfedin →
              </Button>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-sm md:text-base text-gray-300">
            <p>© 2025 giresunhakkinda.com. Tüm hakları saklıdır. @tolgabayrak</p>
          </div>
        </div>
      </footer>
    </div>
  );
}