"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Facebook, Share2, Printer } from "lucide-react";

interface SharePlanProps {
  plan: {
    places: string[];
    restaurant: string;
    sunset?: string;
  };
}

export function SharePlan({ plan }: SharePlanProps) {
  const shareText = `Giresun'da harika bir gün planladım! 🌳\n\n📍 Gezilecek Yerler:\n${plan.places.join('\n')}\n\n🍽️ Yemek: ${plan.restaurant}\n${plan.sunset ? `\n🌅 Gün Batımı: ${plan.sunset}` : ''}\n\nSen de kendi planını oluştur: giresunhakkinda.com/gezi-plani`;

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://giresunhakkinda.com/gezi-plani')}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Plan kopyalandı! Instagram\'da paylaşabilirsiniz.');
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  const printPlan = () => {
    const printContent = `
      <html>
        <head>
          <title>Giresun Gezi Planım</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #15803d;
              border-bottom: 2px solid #15803d;
              padding-bottom: 10px;
            }
            h2 {
              color: #15803d;
              margin-top: 20px;
            }
            .places {
              margin-left: 20px;
            }
            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>🌳 Giresun Gezi Planım</h1>
          
          <h2>📍 Gezilecek Yerler:</h2>
          <div class="places">
            ${plan.places.map((place, index) => `${index + 1}. ${place}`).join('<br>')}
          </div>
          
          <h2>🍽️ Yemek Molası:</h2>
          <div>${plan.restaurant}</div>
          
          ${plan.sunset ? `
            <h2>🌅 Gün Batımı:</h2>
            <div>${plan.sunset}</div>
          ` : ''}
          
          <div class="footer">
            giresunhakkinda.com tarafından oluşturuldu
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow?.document.write(printContent);
    printWindow?.document.close();
    printWindow?.print();
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <h3 className="text-lg font-semibold text-green-800">Planınızı Paylaşın</h3>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={shareToTwitter}
          className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white border-none hover:text-white"
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={shareToFacebook}
          className="bg-[#4267B2] hover:bg-[#365899] text-white border-none hover:text-white"
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white border-none hover:text-white"
        >
          <Instagram className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="bg-green-700 hover:bg-green-800 text-white border-none hover:text-white"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={printPlan}
          className="bg-gray-600 hover:bg-gray-700 text-white border-none hover:text-white"
        >
          <Printer className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 