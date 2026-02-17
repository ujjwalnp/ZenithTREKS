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
            Discover the Soul of <span className="text-amber-400 animate-pulse">The Himalayas</span>
          </h1>
          <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-medium opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
            Join Zenith Treks & Expedition for extraordinary trekking adventures across Nepal, Bhutan, India, and Tibet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]">
            <Link
              href="/trips"
              className="px-8 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 hover:scale-105 transition-all shadow-xl hover:shadow-amber-900/20"
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

      {/* Destinations Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-700 uppercase tracking-widest mb-3">Where We Go</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">Venture Across the Himalayas</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">Traverse Nepal’s legendary mountains hidden valleys, discovering natural beauty and authentic local life along the way.</p>
          </div>


        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-sm font-bold text-amber-700 uppercase tracking-widest mb-3">Handpicked Adventures</h2>
            <h3 className="text-4xl font-bold text-stone-900">Featured Expeditions</h3>
          </div>
          <Link
            href="/trips"
            className="flex items-center text-stone-600 font-bold hover:text-amber-700 transition-colors group"
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
                    {trip.duration || "12 "} Days
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
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-stone-400 font-medium italic">
              Our new expeditions are being prepared. Stay tuned!
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">Why Zenith Treks & Expedition</h2>
            <h3 className="text-4xl font-bold mb-4">Your Trusted Mountain Partner</h3>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">Crafting Himalayan adventures with stunning landscapes and culture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Users, title: "Small Groups", desc: "Intimate trekking experiences focused on safety and personal attention." },
              { icon: MapPin, title: "Skilled Guides", desc: "Certified local experts with years of Himalayan experience." },
              { icon: Calendar, title: "Flexible Itineraries", desc: "Custom schedules designed to fit your travel plans." },
              { icon: Shield, title: "Safety & Support", desc: "Full insurance coverage and emergency protocols on every trek." },
              { icon: Heart, title: "Community Support", desc: "Promoting sustainable tourism and supporting local mountain communities." },
              { icon: Award, title: "Trusted Experience", desc: "Thousands of successful treks and peak expeditions completed." },
              { icon: Globe, title: "Global Travelers", desc: "Welcoming adventurers from around the world." },
              { icon: TrendingUp, title: "Transparent Pricing", desc: "Fair rates with no hidden charges, all in local currency." }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="text-center group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-amber-700/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
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
            <h2 className="text-sm font-bold text-amber-700 uppercase tracking-widest mb-3">Testimonials</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">What Our Travelers Say</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">Real journeys. Real travelers. Real experiences.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sofia Martinez",
                country: "Spain",
                text: "Zenith Treks & Expedition made every moment memorable. The organization, support, and Himalayan expertise were top-notch. Can’t wait for my next adventure with them!",
                rating: 5
              },
              {
                name: "Oliver Kim",
                country: "South Korea",
                text: "From start to finish, everything was smooth and well-planned. The group was small, the scenery stunning, and the guides made the trek safe and enjoyable. Highly recommended!",
                rating: 5
              }, 
              {
                name: "Liam Patel",
                country: "India",
                text: "The Annapurna Circuit trek was unforgettable. Our guides were experienced and attentive, ensuring we felt safe and immersed in local culture. Truly an amazing journey!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-stone-50 p-8 rounded-3xl border border-stone-200 hover:shadow-lg transition-all duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                
                <p className="text-stone-700 mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
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
      <section className="py-24 px-4 bg-gradient-to-br from-amber-700 to-amber-900 text-white">
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
                <h4 className="text-5xl font-black mb-3 text-amber-200">{stat.value}</h4>
                <p className="text-amber-100 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Compass className="h-16 w-16 text-amber-700 mx-auto mb-6 animate-[spin_20s_linear_infinite]" />
          <h2 className="text-4xl font-bold text-stone-900 mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto">
            Step into the Himalayas with confidence. Our expert team ensures every trek is safe, immersive, and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/trips"
              className="px-8 py-4 bg-amber-700 text-white rounded-full font-bold text-lg hover:bg-amber-800 hover:scale-105 transition-all shadow-xl"
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