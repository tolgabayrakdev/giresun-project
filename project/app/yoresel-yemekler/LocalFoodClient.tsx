"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";
import foodData from '@/data/food.json';
import { ShareRecipe } from "@/components/ShareRecipe";

// Slug oluşturma fonksiyonu
function createSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const categories = ["Hepsi", "Sebze Yemekleri", "Çorba", "Hamur İşi", "Tatlılar", "Deniz Ürünü"];

// Client component için food nesnesini dönüştürme
function transformFoodForClient(food: any) {
  return {
    name: food.name,
    description: food.description,
    category: food.recipeCategory,
    ingredients: food.recipeIngredient.map((ingredient: string) => ingredient.split(',')[0]),
    detailedIngredients: food.recipeIngredient,
    preparation: food.recipeInstructions.map((step: any) => step.text),
    image: food.image[0].url
  };
}

export default function LocalFoodClient() {
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  const filteredFoods = selectedCategory === "Hepsi"
    ? foodData.foods
    : foodData.foods.filter(food => food.recipeCategory === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-green-700 mb-6">
          <Link href="/" className="hover:text-green-900">Ana Sayfa</Link>
          <span>/</span>
          <span className="font-medium">Yöresel Yemekler</span>
        </nav>

        {/* Geri Tuşu */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <Button
              variant="ghost"
              className="text-green-700 hover:text-green-900 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </Link>
        </motion.div>

        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4 flex items-center justify-center gap-3">
            <Utensils className="h-8 w-8 md:h-10 md:w-10" />
            Yöresel Lezzetler
          </h1>
          <p className="text-lg text-green-700">
            Giresun'un eşsiz mutfağını keşfedin
          </p>
        </motion.div>

        {/* Kategori Filtreleri */}
        <div className="flex flex-row flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "border-green-200 text-green-700 hover:border-green-300"
              } text-sm md:text-base whitespace-nowrap`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Yemek Listesi */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredFoods.map((food) => {
              const clientFood = transformFoodForClient(food);
              return (
                <motion.div
                  key={food.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                >
                  <Link href={`/yoresel-yemekler/${createSlug(food.name)}`}>
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={clientFood.image}
                        alt={clientFood.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-green-700/80 text-white text-sm rounded-full">
                          {clientFood.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-green-800 mb-2">{clientFood.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{clientFood.description}</p>
                      
                      {/* Malzemeler */}
                      <div className="space-y-2 mb-4">
                        <h4 className="font-semibold text-green-700">Malzemeler:</h4>
                        <div className="flex flex-wrap gap-2">
                          {clientFood.ingredients.slice(0, 3).map((ingredient: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                          {clientFood.ingredients.length > 3 && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                              +{clientFood.ingredients.length - 3} daha
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Tarifi Gör Yazısı */}
                      <div className="mt-4 flex items-center text-green-700 font-medium group-hover:text-green-800">
                        <span>Tarifi Gör</span>
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>

                  {/* Paylaşım Butonları */}
                  <div className="px-6 pb-6">
                    <ShareRecipe food={clientFood} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 