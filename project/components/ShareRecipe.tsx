"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Share2, Copy } from "lucide-react";
import { useState } from "react";

interface ShareRecipeProps {
  food: {
    name: string;
    description: string;
    ingredients: string[];
    preparation: string[];
  };
}

export function ShareRecipe({ food }: ShareRecipeProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `🍽️ ${food.name}\n\n📝 ${food.description}\n\n📋 Malzemeler:\n${food.ingredients.map(i => `• ${i}`).join('\n')}\n\n👩‍🍳 Hazırlanışı:\n${food.preparation.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\nDaha fazla Giresun lezzeti için: giresunhakkinda.com/yoresel-yemekler`;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
      <span className="text-sm text-gray-500 mr-2">Tarifi Paylaş:</span>
      <Button
        variant="outline"
        size="icon"
        onClick={shareToTwitter}
        className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white border-none hover:text-white h-8 w-8"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className={`${
          copied 
            ? "bg-green-600 hover:bg-green-700" 
            : "bg-gray-600 hover:bg-gray-700"
        } text-white border-none hover:text-white h-8 w-8 relative group`}
      >
        {copied ? (
          <>
            <Copy className="h-4 w-4" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Kopyalandı!
            </span>
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              Kopyala
            </span>
          </>
        )}
      </Button>
    </div>
  );
} 