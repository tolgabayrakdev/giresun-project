"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HakkimdaClient() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F5F9] to-white py-16">
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

          <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">Hakkımda</h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="prose prose-green max-w-none">
                <p className="text-lg mb-4">
                  Merhaba! Ben <a 
                    href="https://tolgabayrak.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 underline decoration-2 underline-offset-2"
                  >
                    Tolga Bayrak
                  </a>, 
                  Bu projeyi, doğduğum ve büyüdüğüm şehir olan Giresun'u dijital dünyada 
                  hak ettiği şekilde tanıtmak amacıyla geliştirdim.
                </p>

                <h2 className="text-2xl font-semibold text-green-800 mt-6 mb-4">Proje Hakkında</h2>
                <p className="mb-4">
                  giresunhakkinda.com, Giresun'un doğal güzelliklerini, kültürel zenginliklerini 
                  ve turistik değerlerini tanıtmayı amaçlayan kişisel bir projedir. Bu platformda 
                  paylaşılan tüm içerikler, kendi araştırmalarım, deneyimlerim ve gözlemlerime 
                  dayanmaktadır.
                </p>

                <h2 className="text-2xl font-semibold text-green-800 mt-6 mb-4">Misyon</h2>
                <p className="mb-4">
                  Bu projenin temel amacı:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Giresun'un turistik potansiyelini ön plana çıkarmak</li>
                  <li>Yerel kültür ve değerleri dijital platformda yaşatmak</li>
                  <li>Şehrimizin tanınırlığına katkıda bulunmak</li>
                  <li>Ziyaretçilere kapsamlı bir rehber sunmak</li>
                </ul>

                <h2 className="text-2xl font-semibold text-green-800 mt-6 mb-4">İletişim</h2>
                <p className="mb-4">
                  Proje hakkında görüş, öneri ve işbirliği teklifleriniz için benimle 
                  iletişime geçebilirsiniz.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => window.open('mailto:tolgabayrakj@gmail.com')}
                >
                  <Mail className="h-4 w-4" />
                  tolgabayrakj@gmail.com
                </Button>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>
                  Not: Bu sitede yer alan tüm içerikler kişisel görüş ve deneyimlerime 
                  dayanmaktadır. Resmi bir kurum veya kuruluşu temsil etmemektedir.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 