"use client";

import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";

interface ShareRecipeProps {
  food: {
    name: string;
    description: string;
  };
  slug?: string;
}

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

export function ShareRecipe({ food }: ShareRecipeProps) {
  const recipeUrl = `https://giresunhakkinda.com/yoresel-yemekler/${createSlug(food.name)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(recipeUrl);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <Share2 className="w-4 h-4" />
        Bağlantıyı Kopyala:
      </span>
      <Button
        variant="outline"
        size="icon"
        className="w-8 h-8 text-gray-600 hover:text-green-700 hover:border-green-200"
        onClick={handleCopy}
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
} 