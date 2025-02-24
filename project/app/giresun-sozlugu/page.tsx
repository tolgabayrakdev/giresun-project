import { Metadata } from "next";
import GiresunSozluguClient from "./GiresunSozluguClient";

export const metadata: Metadata = {
  title: "Giresun Sözlüğü - Yerel Kelimeler ve Anlamları",
  description: "Giresun'un yerel kelimelerini, deyimlerini ve anlamlarını keşfedin. Giresun ağzı sözlüğü ile kültürel mirası yaşatın.",
  keywords: [
    "Giresun sözlüğü",
    "Giresun ağzı",
    "Giresun yerel kelimeler",
    "Giresun deyimleri",
    "Karadeniz ağzı"
  ],
}; 

export default function GiresunDictionary() {
  return <GiresunSozluguClient />;
}