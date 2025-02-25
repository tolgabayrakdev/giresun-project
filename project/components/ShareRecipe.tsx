"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";

interface ShareRecipeProps {
  food: {
    name: string;
    description: string;
  };
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
  const [copied, setCopied] = useState(false);
  const recipeUrl = `https://giresunhakkinda.com/yoresel-yemekler/${createSlug(food.name)}`;

  const handleShare = () => {
    navigator.clipboard.writeText(recipeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-gray-600 hover:text-green-700 hover:border-green-200"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4 mr-2" />
      {copied ? "Kopyalandı!" : "Paylaş"}
    </Button>
  );
} 