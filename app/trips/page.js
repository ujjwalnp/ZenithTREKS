 "use client"

import { useEffect, useMemo, useState } from "react"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { normalizeImageUrl } from "@/lib/imageUtils"
import { useSearchParams } from "next/navigation"
import { ArrowRight, MapPin, Search, SlidersHorizontal, Mountain, Calendar, Users } from "lucide-react"
import Footer from "@/components/Footer"

export default function TripsPage() {
  const searchParams = useSearchParams()
  
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [countryFilter, setCountryFilter] = useState(searchParams.get("country") || "all")
  const [priceRange, setPriceRange] = useState(searchParams.get("price") || "all")


  useEffect(() => {
    const loadTrips = async () => {
      try {
        const res = await fetch("/api/trips")
        const data = await res.json()
        setTrips(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("ramhimalayan Failed to load trips", err)
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  const countries = useMemo(
    () => [...new Set(trips.map((trip) => trip.country))].sort(),
    [trips]
  )

  const filteredTrips = useMemo(() => {
    const queryText = search.trim().toLowerCase()

    return trips.filter((trip) => { 
      const title = (trip.title || "").toLowerCase()
      const country = (trip.country || "").toLowerCase()
      const price = Number(trip.price) || 0

      const matchesSearch =
        !queryText || title.includes(queryText) || country.includes(queryText)

      const matchesCountry = countryFilter === "all" || trip.country === countryFilter

      let matchesPrice = true
      if (priceRange === "budget") {
        matchesPrice = price < 100
      } else if (priceRange === "standard") {
        matchesPrice = price >= 100 && price <= 500
      } else if (priceRange === "premium") {
        matchesPrice = price > 500
      }

      return matchesSearch && matchesCountry && matchesPrice
    })
  }, [trips, search, countryFilter, priceRange])

  return (
    <main className="bg-stone-50 min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <Mountain className="h-16 w-16 text-amber-300 mx-auto mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" />
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
            All Expeditions
          </h1>
          <p className="text-amber-100 text-xl max-w-2xl mx-auto mb-8 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
            Browse our full collection of Himalayan treks, mountain climbs, and cultural journeys. Filtered by quality and safety.
          </p>
          <div className="flex items-center justify-center gap-4 text-amber-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5" />
              <span>{trips.length} Adventures</span>
            </div>
            <span className="text-amber-400">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>Nepal</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-24">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-stone-200 opacity-0 animate-[fadeInUp_0.6s_ease-out_0.8s_forwards]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search expeditions..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl border border-stone-200">
                <select
                  className="bg-transparent text-sm text-stone-700 outline-none"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl border border-stone-200">
                <SlidersHorizontal className="h-4 w-4 text-stone-500" />
                <select
                  className="bg-transparent text-sm text-stone-700 outline-none"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">Any price</option>
                  <option value="budget">Under $100</option>
                  <option value="standard">$100 – $500</option>
                  <option value="premium">Above $500</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Trips Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip, index) => (
            <Link
              key={trip.id}
              href={`/trips/${trip.slug || trip.id}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={
                    trip.thumbnail
                      ? normalizeImageUrl(trip.thumbnail)
                      : "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Duration - LEFT */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-stone-900 uppercase tracking-wider">
                  {trip.duration || "12 Days"}
                </div>

                {/* Country - RIGHT */}
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {trip.country}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {trip.title}
                </h4>

                {/* Short Description */}
                <p className="text-stone-500 text-sm mb-6 line-clamp-2">
                  {trip.description
                    ? trip.description
                    : "A breathtaking Himalayan adventure through scenic landscapes and rich culture..."}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                  <div>
                    <span className="text-stone-400 text-sm block mb-1">Starting from</span>
                    <span className="text-2xl font-black text-amber-700">
                      ${Number(trip.price).toLocaleString()}
                    </span>
                  </div>

                  <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center group-hover:bg-amber-700 group-hover:text-white transition-all">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTrips.length === 0 && (
          <div className="text-center py-20">
            <Mountain className="h-20 w-20 text-stone-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-stone-900 mb-3">No expeditions found</h3>
            <p className="text-stone-500 mb-8">
              Try adjusting your filters or search query, or clear them to see all expeditions again.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition-all"
            >
              Return Home
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-stone-900 to-stone-800 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Can't Find Your Perfect Adventure?</h2>
          <p className="text-stone-300 text-lg mb-8 max-w-2xl mx-auto">
            Let us create a custom expedition tailored to your preferences, fitness level, and schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-600 hover:scale-105 transition-all shadow-lg"
            >
              Request Custom Trip
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}