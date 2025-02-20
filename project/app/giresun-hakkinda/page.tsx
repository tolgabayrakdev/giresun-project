import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "Giresun Hakkında - Tarihi, Kültürü ve Doğal Güzellikleri",
    description: "Karadeniz'in incisi Giresun'un tarihi, kültürü, doğal güzellikleri, yaylaları, festivalleri ve yerel lezzetleri hakkında detaylı bilgiler.",
    keywords: [
        "Giresun tarihi",
        "Giresun kültürü",
        "Giresun yaylaları",
        "Giresun mutfağı",
        "Giresun gezilecek yerler",
        "Karadeniz turizmi"
    ],
    openGraph: {
        title: "Giresun Hakkında - Tarihi, Kültürü ve Doğal Güzellikleri",
        description: "Karadeniz'in incisi Giresun'un tarihi, kültürü, doğal güzellikleri, yaylaları, festivalleri ve yerel lezzetleri hakkında detaylı bilgiler.",
        type: "article",
        url: "https://giresunhakkinda.com/giresun-hakkinda",
        images: [
            {
                url: "/images/giresun-genel.jpg",
                width: 1200,
                height: 630,
                alt: "Giresun Şehir Manzarası",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Giresun Hakkında - Tarihi, Kültürü ve Doğal Güzellikleri",
        description: "Karadeniz'in incisi Giresun'un tarihi, kültürü, doğal güzellikleri ve daha fazlası.",
        images: ["/images/giresun-genel.jpg"],
    },
    alternates: {
        canonical: "https://giresunhakkinda.com/giresun-hakkinda",
    },
    authors: [{ name: "Tolga Bayrak" }],
    category: "travel",
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-video-preview': -1,
        'max-snippet': -1,
    }
}

export default function AboutPage() {
    return <AboutPageClient />;
}