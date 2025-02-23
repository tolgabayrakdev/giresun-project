"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Filter, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import albumData from '@/data/album.json';

interface Photo {
  id: string;
  src: string;
  category: string[];
  location: string;
}

const photos: Photo[] = albumData.photos;

const categories = ["Hepsi", "Tarihi", "Manzara", "Doğa", "Yayla", "Deniz", "Şehir"];

export default function PhotoAlbum() {
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = selectedCategory === "Hepsi"
    ? photos
    : photos.filter(photo => photo.category.includes(selectedCategory));

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
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            Fotoğraf Albümü
          </h1>
          <p className="text-lg text-green-700">
            Giresun'un eşsiz güzelliklerini keşfedin
          </p>
        </motion.div>

        {/* Kategori Filtreleri */}
        <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:overflow-visible md:pb-0 md:mb-12 md:mx-0 md:px-0">
          <div className="flex md:flex-wrap md:justify-center gap-2 min-w-max md:min-w-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? "bg-green-700 hover:bg-green-800 text-white"
                    : "border-green-200 text-green-700 hover:border-green-300"
                } whitespace-nowrap text-sm md:text-base px-4 py-2`}
              >
                <span className="flex items-center gap-2">
                  {category === "Hepsi" && <Filter className="w-4 h-4" />}
                  {category === "Manzara" && <Camera className="w-4 h-4" />}
                  {category}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Fotoğraf Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={photo.src}
                    alt={photo.location}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-xl flex items-end">
                  <div className="text-white p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-lg font-semibold opacity-90">{photo.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div className="relative max-w-5xl w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="w-6 h-6" />
                </Button>
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.location}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-b-lg">
                  <p className="text-xl font-semibold mb-4">{selectedPhoto.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.category.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 bg-white/20 rounded-full text-sm"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 