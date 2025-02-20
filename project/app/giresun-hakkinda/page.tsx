import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
    title: "Giresun Rehberi - Hakkımızda",
    description: "Giresun Rehberi Hakkımızda Sayfası",
}

export default function AboutPage() {
    return <AboutPageClient />;
}