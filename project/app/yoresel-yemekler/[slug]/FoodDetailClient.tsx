"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import Link from "next/link";
import { ShareRecipe } from "@/components/ShareRecipe";

interface FoodDetailClientProps {
  food: {
    name: string;
    description: string;
    category: string;
    ingredients: string[];
    detailedIngredients: string[];
    preparation?: string[];
    image: string;
  };
}

export default function FoodDetailClient({ food }: FoodDetailClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-green-700 mb-6">
          <Link href="/" className="hover:text-green-900">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/yoresel-yemekler" className="hover:text-green-900">Yöresel Yemekler</Link>
          <span>/</span>
          <span className="font-medium">{food.name}</span>
        </nav>

        {/* Geri Tuşu */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/yoresel-yemekler">
            <Button
              variant="ghost"
              className="text-green-700 hover:text-green-900 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tüm Yemekler
            </Button>
          </Link>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Yemek Başlığı ve Görseli */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold text-green-900 mb-4">{food.name}</h1>
            <div className="flex items-center gap-4 text-green-700 mb-4">
              <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
                {food.category}
              </span>
            </div>
            <p className="text-gray-600">{food.description}</p>
          </motion.div>

          {/* Malzemeler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm mb-8"
          >
            <h2 className="text-2xl font-semibold text-green-900 mb-4 flex items-center gap-2">
              <ChefHat className="h-6 w-6" />
              Malzemeler
            </h2>
            <ul className="grid grid-cols-1 gap-3">
              {food.detailedIngredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hazırlanışı */}
          {food.preparation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm mb-8"
            >
              <h2 className="text-2xl font-semibold text-green-900 mb-4">
                Hazırlanışı
              </h2>
              <ol className="space-y-4">
                {food.preparation.map((step, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-gray-700"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-semibold">
                      {index + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}

          {/* Paylaşım Butonları */}
          <div className="mt-8">
            <ShareRecipe food={food} />
          </div>
        </div>
      </div>
    </div>
  );
} 