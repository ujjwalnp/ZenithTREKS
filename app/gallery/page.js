"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Loader2, ImageIcon } from "lucide-react"
import { normalizeImageUrl } from "@/lib/imageUtils"

export default function GalleryPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => {
        console.error("[ramhimalayan] Gallery load failed", err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-emerald-700 font-bold uppercase text-xs tracking-[0.3em] mb-3">Gallery</p>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-3">Himalayan Moments</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            A curated collection of breathtaking scenes from our expeditions.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-700" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-100">
            <ImageIcon className="h-16 w-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-stone-700 mb-2">No images yet</h3>
            <p className="text-stone-500">Check back soon for new adventures.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img) => (
              <div key={img.filename} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm">
                <img src={normalizeImageUrl(img.url)} alt={img.filename} className="w-full h-72 object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}

