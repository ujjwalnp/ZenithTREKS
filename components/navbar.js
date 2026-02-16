"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, User } from "lucide-react"

const countries = ["Trips", "Treks"]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [previewTrips, setPreviewTrips] = useState([])
  const [isMobileExpOpen, setIsMobileExpOpen] = useState(false)

  useEffect(() => {
    // Basic session check + load trips preview on mount
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" })
        if (!res.ok) {
          // If session check fails (e.g., not logged in), just treat as no user
          return
        }
        const data = await res.json()
        if (data.user) setUser(data.user)
      } catch {
        // Silently ignore session check failures in the navbar
      }
    }

    const loadPreviewTrips = async () => {
      try {
        const res = await fetch("/api/trips")
        if (!res.ok) return
        const data = await res.json()
        setPreviewTrips(Array.isArray(data) ? data.slice(0, 10) : [])
      } catch (err) {
        console.error("[ramhimalayan] Failed to load trips preview")
      }
    }

    checkSession()
    loadPreviewTrips()
  }, [])

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 md:h-20 items-center gap-2">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image 
              src="/logo.png" 
              alt="Zenith TREKS & Expedition" 
              width={120} 
              height={40} 
              className="h-8 sm:h-10 md:h-12 w-auto"
              priority
            />
            <span className="text-xs sm:text-sm md:text-base font-bold text-stone-900 tracking-tight leading-tight hidden sm:block">
              ZENITH TREKS & EXPEDITION
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">
              About
            </Link>
            <Link href="/gallery" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">
              Gallery
            </Link>

            <div className="relative group">
              <button className="flex items-center text-stone-600 group-hover:text-amber-700 font-medium transition-colors">
                Destinations <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-stone-100 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {countries.map((country) => (
                  <Link
                    key={country}
                    href={`/destinations/${country.toLowerCase()}`}
                    className="block px-4 py-3 text-stone-600 hover:bg-stone-50 hover:text-amber-700 transition-colors"
                  >
                    {country}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/trips"
                className="flex items-center text-stone-600 group-hover:text-amber-700 font-medium transition-colors"
              >
                Expeditions <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              <div className="absolute top-full left-0 mt-2 w-[420px] bg-white border border-stone-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-3 border-b border-stone-100 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Featured Expeditions
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-4 py-3 max-h-80 overflow-y-auto">
                  {previewTrips.length === 0 ? (
                    <span className="col-span-2 text-xs text-stone-400">No expeditions available yet.</span>
                  ) : (
                    previewTrips.map((trip) => (
                      <Link
                        key={trip.id}
                        href={`/trips/${trip.slug || trip.id}`}
                        className="text-sm text-stone-600 hover:text-amber-700 py-1 truncate"
                      >
                        {trip.title}
                      </Link>
                    ))
                  )}
                </div>
                <div className="px-4 py-3 border-t border-stone-100">
                  <Link
                    href="/trips"
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    View all expeditions →
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/contact" className="text-stone-600 hover:text-amber-700 font-medium transition-colors">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={user.role === "admin" ? "/admin" : "/profile"}
                  className="flex items-center space-x-2 text-stone-700 font-medium"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await fetch("/api/auth/logout", { method: "POST" })
                      window.location.href = "/login"
                    } catch (err) {
                      console.error("Logout failed:", err)
                    }
                  }}
                  className="text-stone-500 hover:text-stone-900 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-amber-700 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-amber-800 transition-all shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center shrink-0">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-900 p-1.5 touch-manipulation">
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 py-4 px-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link 
            href="/" 
            className="block text-stone-900 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="block text-stone-900 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/gallery" 
            className="block text-stone-900 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </Link>
          <div className="space-y-2">
            <p className="text-stone-500 text-sm font-bold uppercase tracking-wider">Destinations</p>
            {countries.map((country) => (
              <Link 
                key={country} 
                href={`/destinations/${country.toLowerCase()}`} 
                className="block pl-4 text-stone-700 py-2"
                onClick={() => setIsOpen(false)}
              >
                {country}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <button
              onClick={() => setIsMobileExpOpen((prev) => !prev)}
              className="w-full flex items-center justify-between text-stone-900 font-medium py-2"
            >
              <span>Expeditions</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isMobileExpOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobileExpOpen && (
              <div className="space-y-1 bg-stone-50 rounded-xl border border-stone-100 p-2 max-h-60 overflow-y-auto">
                {previewTrips.length === 0 ? (
                  <span className="block text-xs text-stone-400 px-2 py-2">No expeditions yet.</span>
                ) : (
                  previewTrips.map((trip) => (
                    <Link
                      key={trip.id}
                      href={`/trips/${trip.slug || trip.id}`}
                      className="block px-3 py-2 text-sm text-stone-700 hover:text-amber-700"
                      onClick={() => setIsOpen(false)}
                    >
                      {trip.title}
                    </Link>
                  ))
                )}
                <Link
                  href="/trips"
                  className="block px-3 py-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                  onClick={() => setIsOpen(false)}
                >
                  View all expeditions →
                </Link>
              </div>
            )}
          </div>
          <Link 
            href="/contact" 
            className="block text-stone-900 font-medium py-2"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-4 border-t border-stone-100">
            {user ? (
              <>
                <Link 
                  href={user.role === "admin" ? "/admin" : "/profile"}
                  className="block text-amber-700 font-bold py-2"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await fetch("/api/auth/logout", { method: "POST" })
                      window.location.href = "/login"
                    } catch (err) {
                      console.error("Logout failed:", err)
                    }
                  }}
                  className="block w-full text-left text-stone-500 hover:text-stone-900 font-medium py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block text-center bg-amber-700 text-white py-3 rounded-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}