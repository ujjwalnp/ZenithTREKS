"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"
import { Loader2, Calendar, Users, DollarSign, MapPin, LogOut, Package } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkSession()
    fetchBookings()
  }, [])

  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/session")
      const data = await res.json()
      if (data.user) {
        setUser(data.user)
      } else {
        router.push("/login")
      }
    } catch (err) {
      console.error("Session check failed:", err)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings")
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      } else if (res.status === 401) {
        router.push("/login")
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err)
    } finally {
      setBookingsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        router.push("/login")
        router.refresh()
      }
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-amber-100 text-amber-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="h-10 w-10 animate-spin text-amber-700" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="pt-32 pb-24 px-4 max-w-6xl mx-auto">
        {/* User Info Section */}
        <div className="bg-white rounded-4xl shadow-2xl border border-stone-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black text-stone-900 mb-2">My Profile</h1>
              <p className="text-stone-500 text-lg">{user.name}</p>
              <p className="text-stone-400 text-sm mt-1">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 flex items-center space-x-2 text-stone-600 hover:text-red-600 font-medium transition-colors px-4 py-2 rounded-xl hover:bg-stone-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-4xl shadow-2xl border border-stone-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-stone-900 flex items-center space-x-2">
              <Package className="h-6 w-6 text-amber-700" />
              <span>My Bookings</span>
            </h2>
            <Link
              href="/trips"
              className="text-amber-700 hover:text-amber-800 font-bold text-sm transition-colors"
            >
              Browse Trips →
            </Link>
          </div>

          {bookingsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-stone-700 mb-2">No Bookings Yet</h3>
              <p className="text-stone-500 mb-6">Start your Himalayan adventure by booking a trip!</p>
              <Link
                href="/trips"
                className="inline-block bg-amber-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-800 transition-all shadow-lg"
              >
                Explore Trips
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-stone-50"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-black text-stone-900 mb-1">{booking.trip_title}</h3>
                          <div className="flex items-center space-x-2 text-stone-500 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>Booking ID: #{booking.id}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status || "pending"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 text-stone-600">
                          <Users className="h-5 w-5 text-amber-700" />
                          <div>
                            <p className="text-xs font-bold uppercase text-stone-400">Participants</p>
                            <p className="font-bold">{booking.participants}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-stone-600">
                          <Calendar className="h-5 w-5 text-amber-700" />
                          <div>
                            <p className="text-xs font-bold uppercase text-stone-400">Booking Date</p>
                            <p className="font-bold">{formatDate(booking.booking_date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-stone-600">
                          <Calendar className="h-5 w-5 text-amber-700" />
                          <div>
                            <p className="text-xs font-bold uppercase text-stone-400">Booked On</p>
                            <p className="font-bold">{formatDate(booking.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-stone-600">
                          <div>
                            <p className="text-xs font-bold uppercase text-stone-400">Total Price</p>
                            <p className="font-black text-amber-700">Rs. {Number(booking.total_price).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-stone-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-stone-400 font-bold uppercase text-xs mb-1">Contact Name</p>
                            <p className="font-medium text-stone-700">{booking.full_name}</p>
                          </div>
                          <div>
                            <p className="text-stone-400 font-bold uppercase text-xs mb-1">Contact Email</p>
                            <p className="font-medium text-stone-700">{booking.email}</p>
                          </div>
                          <div>
                            <p className="text-stone-400 font-bold uppercase text-xs mb-1">Contact Phone</p>
                            <p className="font-medium text-stone-700">{booking.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}


