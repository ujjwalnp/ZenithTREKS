import Navbar from "@/components/navbar"
import { query } from "@/lib/db"
import { normalizeImageUrl } from "@/lib/imageUtils"
import Link from "next/link"
import { MapPin, Calendar, Users, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"
import Footer from "@/components/Footer"

export default async function TripDetailsPage({ params }) {
  const { id: slugOrId } = await params

  const trips = await query({
    // Try matching by slug first, then by numeric id for backward compatibility
    query: "SELECT * FROM trips WHERE slug = ? OR id = ?",
    values: [slugOrId, slugOrId],
  })

  if (trips.length === 0) notFound()
  const trip = trips[0]

  return (
    <main className="bg-stone-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative ">
        <div className="relative w-full">
          <img
            src={trip.thumbnail ? normalizeImageUrl(trip.thumbnail) : "/placeholder.svg?height=800&width=1200"}
            alt={trip.title}
            className="w-full h-auto min-h-[400px] sm:min-h-[500px] object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 pb-8 sm:pb-12 md:pb-16 w-full text-white">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {trip.country}
            </span>
            <div className="flex items-center text-stone-300 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{trip.country} Expedition</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">{trip.title}</h1>
          <div className="flex flex-wrap gap-6 text-stone-300 font-medium">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-emerald-400" /> Fixed Departures
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-emerald-400" /> Small Groups
            </div>
          </div>
        </div>
      </div>
      
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-2xl font-bold text-stone-900 mb-8 border-b border-stone-100 pb-4">
              Itinerary & Overview
            </h2>
            <div
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: trip.description }}
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-emerald-600" />
                What's Included
              </h3>
              <ul className="space-y-3 text-emerald-800/80 text-sm font-medium">
                <li>Professional certified local guides</li>
                <li>All ground transportation during trip</li>
                <li>Quality trekking equipment & permits</li>
                <li>Full board meals while trekking</li>
              </ul>
            </div>
            <div className="bg-stone-100 p-8 rounded-3xl border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-stone-600" />
                Who is this for?
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Perfect for adventure seekers looking to experience authentic Himalayan culture and breathtaking
                mountain vistas.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden">
            <div className="bg-stone-900 p-8 text-white">
              <span className="text-stone-400 text-xs uppercase font-bold tracking-widest block mb-1">
                Starting Price
              </span>
              <div className="text-4xl font-black text-emerald-400">${Number(trip.price).toLocaleString()}</div>
              <p className="text-stone-400 text-xs mt-2 font-medium">Per person • Inclusive of all taxes</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 font-medium">Duration</span>
                  <span className="text-stone-900 font-bold">12 Days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 font-medium">Max Altitude</span>
                  <span className="text-stone-900 font-bold">5,364m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500 font-medium">Difficulty</span>
                  <span className="text-emerald-700 font-bold">Moderate</span>
                </div>
              </div>

              <Link
                href={`/trips/${trip.id}/book`}
                className="w-full bg-emerald-700 text-white py-4 rounded-xl font-bold text-center block shadow-lg hover:bg-emerald-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Book This Trip
              </Link>

              <p className="text-center text-stone-400 text-xs font-medium">
                Instant confirmation available for select dates
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </main>
  )
}