import Navbar from "@/components/navbar"
import { query } from "@/lib/db"
import { normalizeImageUrl } from "@/lib/imageUtils"
import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Users, Mountain } from "lucide-react"
import Footer from "@/components/Footer"

export default async function DestinationPage({ params }) {
  const { country } = await params
  const trips = await query({
    query: "SELECT * FROM trips WHERE LOWER(country) = ? ORDER BY title ASC",
    values: [country.toLowerCase()],
  })

  return (
    <main className="bg-gradient-to-br from-stone-50 via-emerald-50/30 to-stone-50 min-h-screen">
      <Navbar />
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            <Mountain className="h-4 w-4" />
            Explore Destination
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-stone-900 mb-6 capitalize tracking-tight">
            {country}
          </h1>
          <p className="text-stone-600 max-w-2xl text-xl leading-relaxed">
            Discover the breathtaking trails and hidden gems of {country}. From peak summits to ancient valleys, embark on an unforgettable adventure.
          </p>
          
          {trips.length > 0 && (
            <div className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-stone-200">
              <div>
                <p className="text-stone-500 text-sm font-medium mb-1">Available Trips</p>
                <p className="text-3xl font-black text-stone-900">{trips.length}</p>
              </div>
              <div>
                <p className="text-stone-500 text-sm font-medium mb-1">Starting From</p>
                <p className="text-3xl font-black text-emerald-700">
                  $ {Math.min(...trips.map(t => Number(t.price))).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trips Grid */}
      <div className="pb-24 px-4 max-w-7xl mx-auto">
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-stone-200 hover:border-emerald-200 flex flex-col hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-72 overflow-hidden bg-stone-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-10" />
                  <img
                    src={trip.thumbnail ? normalizeImageUrl(trip.thumbnail) : "/placeholder.svg?height=400&width=600&query=mountain+trek"}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-emerald-700 shadow-lg">
                      {country}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {trip.title}
                  </h3>

                  
                  <div className="grid grid-cols-2 gap-3 mb-5 ">
                    {trip.duration && (
                      <div className="flex items-center gap-2 text-stone-600">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">{trip.duration}</span>
                      </div>
                    )}
                    {trip.group_size && (
                      <div className="flex items-center gap-2 text-stone-600">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium">{trip.group_size}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <span className="text-stone-400 text-xs block uppercase tracking-wider mb-1">
                        From
                      </span>
                      <span className="text-2xl font-black text-emerald-700">
                        $ {Number(trip.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center group-hover:bg-emerald-700 group-hover:scale-110 transition-all">
                      <ArrowRight className="h-5 w-5 text-emerald-700 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-stone-200 shadow-sm">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-10 w-10 text-stone-400" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-3">No Trips Available Yet</h3>
            <p className="text-stone-500 font-medium mb-8 max-w-md mx-auto">
              We're currently planning exciting adventures to {country}. Check back soon or explore our other destinations.
            </p>
            <Link 
              href="/trips" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-700 text-white font-bold rounded-full hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl"
            >
              Browse All Trips
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}