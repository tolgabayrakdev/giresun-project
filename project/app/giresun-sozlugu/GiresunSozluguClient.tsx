"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Book } from "lucide-react";
import Link from "next/link";
import dictionaryData from '@/data/dictionary.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Word {
  word: string;
  meaning: string;
  example?: string;
  category: string;
}

const words: Word[] = dictionaryData.words;

const categories = ["Hepsi", "Akrabalık", "Selamlaşma", "Fiil", "Sıfat", "Yemek", "Günlük Hayat"];

export default function GiresunSozluguClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");

  const filteredWords = words
    .filter(word => 
      (selectedCategory === "Hepsi" || word.category === selectedCategory) &&
      (word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
       word.meaning.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => a.word.localeCompare(b.word));

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
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2 flex items-center justify-center gap-3">
            <Book className="h-8 w-8 md:h-10 md:w-10" />
            Giresun Sözlüğü
          </h1>
        </motion.div>

        {/* Arama ve Filtreler - Daha kompakt */}
        <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Kelime veya anlam ara..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Kategori Seç" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kelime Listesi - Daha minimal */}
        <motion.div
          layout
          className="max-w-3xl mx-auto grid gap-3"
        >
          <AnimatePresence>
            {filteredWords.map((word) => (
              <motion.div
                key={word.word}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">{word.word}</h3>
                    <p className="text-gray-600 text-sm">{word.meaning}</p>
                    {word.example && (
                      <p className="text-xs text-gray-500 italic mt-1">"{word.example}"</p>
                    )}
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full whitespace-nowrap">
                    {word.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
} 