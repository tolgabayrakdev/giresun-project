import React from 'react'
import GeziPlaniClient from './GeziPlaniClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gezi Planı | Giresun Gezi Rehberi',
  description: 'Giresun\'da gezilecek yerler, turistik mekanlar ve özel rotalar. Şehrimizin tarihi, doğal ve kültürel güzelliklerini keşfedin.',
  keywords: 'Giresun gezi rehberi, Giresun gezilecek yerler, Giresun turistik yerler, Giresun rota planı, Giresun şehir turu',
  openGraph: {
    title: 'Gezi Planı | Giresun Gezi Rehberi',
    description: 'Giresun\'da gezilecek yerler, turistik mekanlar ve özel rotalar. Şehrimizin tarihi, doğal ve kültürel güzelliklerini keşfedin.',
    images: [
      {
        url: '/images/giresun-gezi-rehberi-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Giresun Gezi Rehberi',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TripPlan() {
  return (
    <>
      <GeziPlaniClient />
    </>
  )
}
