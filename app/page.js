import Link from "next/link"
import Navbar from "@/components/navbar"
import { query } from "@/lib/db"
import { normalizeImageUrl } from "@/lib/imageUtils"
import { MapPin, Calendar, Users, ArrowRight, Mountain, Award, Shield, Heart, Star, Globe, Compass, TrendingUp } from "lucide-react"
import Footer from "@/components/Footer"
import ReviewsSection from "@/components/ReviewsSection"
import HeroSearch from "@/components/HeroSearch"

async function getFeaturedTrips() {
  return await query({
    query: "SELECT * FROM trips WHERE country = 'Treks' OR country = 'trek' OR country = 'treks' ORDER BY created_at DESC LIMIT 3",
  })
}

export default async function Home() {
  const featuredTrips = await getFeaturedTrips()

  return (
    <main className="bg-stone-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        {/* <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Discover the Soul of <span className="text-emerald-400 animate-pulse">The Himalayas</span>
          </h1>
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-medium opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
            Join Zenith Treks & Expedition for extraordinary trekking adventures across Nepal, Bhutan, India, and Tibet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
            <Link
              href="/trips"
              className="px-8 py-4 bg-emerald-700 text-white rounded-full font-bold text-lg hover:bg-emerald-800 hover:scale-105 transition-all shadow-xl hover:shadow-emerald-900/20"
            >
              Explore All Trips
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all"
            >
              Learn Our Story
            </Link>
          </div>
        </div> */}

        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="mt-55 w-full px-4">
            <HeroSearch />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-[slideDown_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">Handpicked Adventures</h2>
            <h3 className="text-4xl font-bold text-stone-900">Featured Expeditions</h3>
          </div>
          <Link
            href="/trips"
            className="flex items-center text-stone-600 font-bold hover:text-emerald-700 transition-colors group"
          >
            View all trips <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTrips.length > 0 ? (
            featuredTrips.map((trip, index) => (
              <Link
                key={trip.id}
                href={`/trips/${trip.slug || trip.id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-100 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={trip.thumbnail ? normalizeImageUrl(trip.thumbnail) : "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"}
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-stone-900 uppercase tracking-wider">
                    {trip.country}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-stone-900 mb-4 group-hover:text-emerald-700 transition-colors">
                    {trip.title}
                  </h4>
                  <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                    <div>
                      <span className="text-stone-400 text-sm block mb-1">Starting from</span>
                      <span className="text-2xl font-black text-emerald-700">
                        ${Number(trip.price).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-stone-400 font-medium italic">
              Our new expeditions are being prepared. Stay tuned!
            </div>
          )}
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">Where We Go</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">Explore the Himalayan Region</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">From the peaks of Nepal to the valleys of Bhutan, discover diverse landscapes and rich cultures</p>
          </div>


        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Why Zenith Treks & Expedition</h2>
            <h3 className="text-4xl font-bold mb-4">Your Trusted Mountain Partner</h3>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">Decades of experience in creating unforgettable Himalayan adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: MapPin, title: "Expert Guides", desc: "Certified local specialists with decades of experience." },
              { icon: Calendar, title: "Flexible Dates", desc: "Customizable itineraries to suit your schedule." },
              { icon: Users, title: "Small Groups", desc: "Intimate experiences with focus on safety and culture." },
              { icon: Shield, title: "Safety First", desc: "Comprehensive insurance and emergency protocols." },
              { icon: Award, title: "Proven Track Record", desc: "Over 10,000 successful expeditions completed." },
              { icon: Heart, title: "Local Community", desc: "Supporting local economies and sustainable tourism." },
              { icon: Globe, title: "International Service", desc: "Welcoming travelers from over 50 countries." },
              { icon: TrendingUp, title: "Fair Pricing", desc: "Competitive rates in local currency with no hidden fees." }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="text-center group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-emerald-700/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h5 className="text-xl font-bold mb-3">{item.title}</h5>
                  <p className="text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Traveler Reviews (dynamic) */}
      <ReviewsSection />

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">Testimonials</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">What Our Travelers Say</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">Real experiences from real adventurers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                country: "USA",
                text: "The Everest Base Camp trek was a life-changing experience. Our guide was knowledgeable, patient, and made sure everyone was safe and comfortable. Highly recommend!",
                rating: 5
              },
              {
                name: "Michael Chen",
                country: "Singapore",
                text: "Zenith Treks & Expedition exceeded all expectations. The attention to detail, cultural insights, and professionalism were outstanding. Already planning my next trip!",
                rating: 5
              },
              {
                name: "Emma Williams",
                country: "UK",
                text: "From booking to completion, everything was seamless. The small group size made it feel personal, and the scenery was absolutely breathtaking. Thank you for an amazing adventure!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-stone-50 p-8 rounded-3xl border border-stone-200 hover:shadow-lg transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-stone-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-900">{testimonial.name}</h5>
                    <p className="text-stone-500 text-sm">{testimonial.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: "10,000+", label: "Happy Travelers" },
              { value: "77+", label: "Destinations" },
              { value: "15+", label: "Years Experience" },
              { value: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-5xl font-black mb-3 text-emerald-200">{stat.value}</h4>
                <p className="text-emerald-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Compass className="h-16 w-16 text-emerald-700 mx-auto mb-6 animate-[spin_20s_linear_infinite]" />
          <h2 className="text-4xl font-bold text-stone-900 mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Let us help you plan the perfect Himalayan expedition. Our team is ready to answer your questions and customize your journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/trips"
              className="px-8 py-4 bg-emerald-700 text-white rounded-full font-bold text-lg hover:bg-emerald-800 hover:scale-105 transition-all shadow-xl"
            >
              Browse All Trips
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-stone-100 text-stone-900 rounded-full font-bold text-lg hover:bg-stone-200 hover:scale-105 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}