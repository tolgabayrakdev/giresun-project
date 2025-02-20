"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-green-800 flex items-center justify-center p-4">
      <motion.div 
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-100">
            Sayfa Bulunamadı
          </h2>
          <p className="text-green-100/80 max-w-md mx-auto">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek Giresun'u keşfetmeye devam edebilirsiniz.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => router.push('/')}
            className="bg-white hover:bg-green-50 text-green-900 flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 