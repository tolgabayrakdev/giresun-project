import React from 'react'
import FotografAlbumuClient from './FotografAlbumuClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fotoğraf Albümü | Giresun Belediyesi',
  description: 'Giresun Belediyesi resmi fotoğraf albümü. Şehrimizin güzelliklerini, etkinliklerini ve önemli anlarını keşfedin.',
  keywords: 'Giresun fotoğrafları, Giresun Belediyesi albüm, Giresun görsel galeri, Giresun etkinlik fotoğrafları',
  openGraph: {
    title: 'Fotoğraf Albümü | Giresun Belediyesi',
    description: 'Giresun Belediyesi resmi fotoğraf albümü. Şehrimizin güzelliklerini, etkinliklerini ve önemli anlarını keşfedin.',
    images: [
      {
        url: '/images/giresun-foto-album-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Giresun Belediyesi Fotoğraf Albümü',
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

export default function PhotoAlbum() {
  return (
    <>
      <FotografAlbumuClient />
    </>
  )
}
