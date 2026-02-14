"use client"

import { useState, useEffect, use } from "react"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/Footer"
export default function BookingPage({ params }) {
  const { id: slugOrId } = use(params)
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [booked, setBooked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    participants: 1,
    bookingDate: "",
  })

  useEffect(() => {
    // Check if user is logged in
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(!!data.user)
      })
      .catch(() => {
        setIsLoggedIn(false)
      })

    // Load trip data
    fetch(`/api/trips/${slugOrId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load trip")
        }
        return res.json()
      })
      .then((data) => {
        setTrip(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading trip:", error)
        alert("Failed to load trip information. Please try again.")
        setLoading(false)
      })
  }, [slugOrId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!trip) {
      alert("Trip information is still loading. Please wait.")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId: Number(trip.id),
          ...formData,
          totalPrice: Number(trip.price) * Number(formData.participants),
        }),
      })

      if (res.ok) {
        setBooked(true)
      } else {
        const data = await res.json()
        alert(data.error || "Booking failed")
      }
    } catch (err) {
      console.error("Booking error:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-700" />
      </div>
    )

  if (!trip) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-12 rounded-[2rem] shadow-2xl text-center border border-stone-100">
          <h1 className="text-2xl font-black text-stone-900 mb-4">Trip Not Found</h1>
          <p className="text-stone-500 mb-6">Unable to load trip information.</p>
          <Link
            href="/trips"
            className="bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all inline-block"
          >
            Back to Trips
          </Link>
        </div>
      </main>
    )
  }

  if (booked)
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-lg w-full p-12 rounded-[2rem] shadow-2xl text-center border border-stone-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-black text-stone-900 mb-4">Booking Confirmed!</h1>
          <p className="text-stone-500 mb-10 text-lg leading-relaxed">
            Namaste! Your expedition to <strong>{trip.title}</strong> has been booked. We will send the details to your
            email once the booking is confirmed.
          </p>
          {isLoggedIn && (
            <Link
              href="/profile"
              className="bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-800 transition-all block text-center shadow-lg"
            >
              View My Bookings
            </Link>
          )}
        </div>
      </main>
    )

  return (
    <main className="bg-stone-50 min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto">
        <Link
          href={`/trips/${trip.slug || slugOrId}`}
          className="flex items-center text-stone-500 hover:text-emerald-700 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Trip Details
        </Link>

        <div className="bg-white rounded-[2rem] shadow-2xl border border-stone-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 bg-stone-900 p-10 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4">You're booking</h2>
              <h1 className="text-3xl font-black tracking-tight leading-tight">{trip.title}</h1>
              <p className="text-stone-400 mt-4 text-sm font-medium">{trip.country} Expedition</p>
            </div>

            <div className="pt-10 mt-10 border-t border-stone-800">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-stone-500 text-xs font-bold uppercase block mb-1">Per Person</span>
                  <span className="text-2xl font-black text-emerald-400">
                    $ {Number(trip.price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-3 p-10 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  placeholder="Ram Prasad"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    placeholder="ram@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    placeholder="+977 9800000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Number of People</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 font-black text-xl text-emerald-700"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) || 1 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-5 py-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    value={formData.bookingDate}
                    onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-stone-400 text-xs font-bold uppercase block mb-1">Total Payable</span>
                <span className="text-3xl font-black text-stone-900">
                  $ {
                  
                  (((Number(trip.price) * Number(formData.participants))-0.05*(Number(trip.price) * Number(formData.participants)))*((1-0.05)**(Number(formData.participants)-2))).toLocaleString()
                  
                  }
                </span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-emerald-700 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-emerald-800 transition-all flex items-center disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}

