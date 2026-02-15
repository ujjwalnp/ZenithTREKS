import Image from "next/image"
import Navbar from "@/components/navbar"
import { Compass, Map, ShieldCheck, Users, Award, Heart, Globe, Mountain, CheckCircle, Quote, Star, TrendingUp, Leaf } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"

export const metadata = {
  title: "About Us | Zenith Treks & Expedition",
  description: "Learn about our journey and commitment to providing the best trekking experiences in the Himalayas.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2000&q=80"
            alt="Himalayan Panorama"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Mountain className="h-16 w-16 text-emerald-400 mx-auto mb-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg opacity-0 animate-[fadeInUp_0.6s_ease-out_0.2s_forwards]">
            Our Journey
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 max-w-3xl mx-auto font-medium opacity-0 animate-[fadeInUp_0.6s_ease-out_0.4s_forwards]">
            Bringing the magic of the Himalayas closer to you since 2010.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        {/* Company Story */}
        <section className="grid md:grid-cols-2 gap-16 items-center py-24">
          <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_0.6s_forwards]">
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">Our Story</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-8">Who is Zenith Treks & Expedition?</h3>
            <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
              <p>
                Founded by passionate trekkers and local guides, Zenith Treks & Expedition was born out of a desire to share
                the raw beauty and spiritual essence of the world's highest peaks with adventurers from around the
                globe.
              </p>
              <p>
                Based in the heart of Nepal, we specialize in curated trekking experiences that go beyond the standard
                trails. Our team consists of local experts who have spent their lives navigating these mountains,
                ensuring that every trip is not just a hike, but a deep dive into the local culture, tradition, and
                geography.
              </p>
              <p>
                Whether you are looking for the challenge of Everest Base Camp or the serene trails of the Annapurna
                circuit, we provide the safety, expertise, and personalized touch that turns a vacation into a
                life-changing journey.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-stone-200">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-700 mb-1">15+</div>
                <div className="text-sm text-stone-500 font-medium">Years</div>
              </div>
              <div className="w-px h-12 bg-stone-200"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-700 mb-1">10k+</div>
                <div className="text-sm text-stone-500 font-medium">Travelers</div>
              </div>
              <div className="w-px h-12 bg-stone-200"></div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-700 mb-1">77+</div>
                <div className="text-sm text-stone-500 font-medium">Destinations</div>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group opacity-0 animate-[fadeInUp_0.6s_ease-out_0.8s_forwards] bg-black flex items-center justify-end md:justify-end max-w-xs md:max-w-sm ml-auto">
  <video className="h-full w-auto object-contain" src="/vid.mp4" autoPlay loop muted controls poster="/logo.png" />
</div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gradient-to-br from-emerald-900 to-emerald-800 -mx-4 px-4 rounded-3xl text-white mb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_1s_forwards]">
              <div className="w-16 h-16 bg-emerald-700/30 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                To create transformative mountain experiences that connect people with nature, local cultures, and themselves. 
                We believe every journey should leave a lasting positive impact on both the traveler and the communities we visit.
              </p>
            </div>
            <div className="opacity-0 animate-[fadeInUp_0.6s_ease-out_1.2s_forwards]">
              <div className="w-16 h-16 bg-emerald-700/30 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-emerald-300" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                To be the most trusted and sustainable adventure travel company in the Himalayas, setting the standard 
                for responsible tourism while preserving the pristine beauty and cultural heritage of the mountains for future generations.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">What Sets Us Apart</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">Why Choose Zenith Treks & Expedition?</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              We combine local expertise with international standards to deliver unforgettable experiences
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Local Experts",
                desc: "Our guides are born and raised in the mountain regions, offering unmatched local knowledge and authentic connections.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Safety First",
                desc: "We maintain rigorous safety standards and carry high-altitude medical equipment on every trek.",
              },
              {
                icon: <Map className="w-8 h-8" />,
                title: "Unique Routes",
                desc: "Beyond the mainstream paths, we take you to hidden gems known only to the locals.",
              },
              {
                icon: <Compass className="w-8 h-8" />,
                title: "Eco-Conscious",
                desc: "We practice sustainable tourism to ensure the Himalayas remain pristine for generations.",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Award Winning",
                desc: "Recognized for excellence in sustainable tourism and customer satisfaction.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Cultural Immersion",
                desc: "Experience authentic local culture, cuisine, and hospitality throughout your journey.",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Small Groups",
                desc: "Intimate group sizes ensure personalized attention and deeper connections.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Leave No Trace",
                desc: "We're committed to zero-waste expeditions and supporting local conservation efforts.",
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="text-center p-8 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${1.4 + (i * 0.1)}s` }}
              >
                <div className="text-emerald-700 mb-4 flex justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-stone-900">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Commitments */}
        <section className="py-24 bg-white rounded-3xl px-8 md:px-16 mb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">Our Commitments</h2>
              <h3 className="text-4xl font-bold text-stone-900 mb-8">What We Stand For</h3>
              <div className="space-y-6">
                {[
                  "Fair wages and good working conditions for all local staff",
                  "Supporting local businesses and communities in mountain regions",
                  "Environmental conservation and sustainable trekking practices",
                  "Transparent pricing with no hidden costs",
                  "Comprehensive travel insurance and safety protocols",
                  "Cultural sensitivity and respect for local traditions",
                  "Carbon offset programs for all our expeditions",
                  "Emergency evacuation and medical support on all treks"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
                      <CheckCircle className="h-4 w-4 text-emerald-700 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-stone-700 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" 
                alt="Mountain landscape" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-24 bg-stone-900 -mx-4 px-4 rounded-3xl text-white mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="h-16 w-16 text-emerald-400 mx-auto mb-8 opacity-50" />
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
              "Zenith Treks & Expedition didn't just take us to the mountains – they introduced us to a way of life. 
              The cultural experiences, the warmth of the local people, and the expertise of our guides made this 
              the most meaningful trip of our lives."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">Michael Chen</div>
                <div className="text-emerald-300">Singapore • Everest Base Camp Trek 2024</div>
              </div>
            </div>
            <div className="flex justify-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">Meet The Team</h2>
            <h3 className="text-4xl font-bold text-stone-900 mb-4">Expert Guides & Support Staff</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Our team of certified mountain guides and support staff are passionate about sharing their knowledge
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Ramesh Sherpa", role: "Lead Guide & Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
              { name: "Pemba Dorje", role: "Senior Trek Guide", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
              { name: "Ang Tsering", role: "Safety Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
              { name: "Lakpa Sherpa", role: "Cultural Liaison", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80" }
            ].map((member, i) => (
              <div 
                key={i} 
                className="group opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${2 + (i * 0.1)}s` }}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                    <p className="text-emerald-300 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center max-w-4xl mx-auto py-24">
          <Compass className="h-16 w-16 text-emerald-700 mx-auto mb-6 animate-[spin_20s_linear_infinite]" />
          <h2 className="text-4xl font-bold text-stone-900 mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-stone-600 text-lg mb-10 max-w-2xl mx-auto">
            The mountains are calling. Let us help you plan the trekking experience of a lifetime with our expert team and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trips"
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-lg rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explore Our Trips
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-lg rounded-full transition-all hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
    
  )
}