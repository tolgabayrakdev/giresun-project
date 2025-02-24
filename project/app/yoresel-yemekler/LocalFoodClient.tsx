"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Utensils } from "lucide-react";
import Link from "next/link";
import foodData from '@/data/food.json';


const categories = ["Hepsi", "Ana Yemek", "Çorba", "Hamur İşi", "Tatlı", "Deniz Ürünü"];

export default function LocalFoodClient() {
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  const filteredFoods = selectedCategory === "Hepsi"
    ? foodData.foods
    : foodData.foods.filter(food => food.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="container mx-auto px-4">
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
            {filteredFoods.map((food) => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-700/80 text-white text-sm rounded-full">
                      {food.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-2">{food.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{food.description}</p>
                  
                  {/* Malzemeler */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-green-700">Malzemeler:</h4>
                    <div className="flex flex-wrap gap-2">
                      {food.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hazırlanışı */}
                  {food.preparation && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-700">Hazırlanışı:</h4>
                      <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                        {food.preparation.map((step, index) => (
                          <li key={index} className="pl-1">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 