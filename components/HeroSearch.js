"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

export default function HeroSearch() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("all")
  const [price, setPrice] = useState("all")

  const handleSubmit = (e) => {
    e.preventDefault() // prevent page reload

    const params = new URLSearchParams()

    if (search) params.append("search", search)
    if (country !== "all") params.append("country", country)
    if (price !== "all") params.append("price", price)

    router.push(`/trips?${params.toString()}`)
  }

  return (
    <div className="bg-white/95 backdrop-blur-lg p-4 rounded-xl shadow-2xl w-full max-w-5xl mx-auto">

      {/* Wrap everything inside form */}
      <form onSubmit={handleSubmit}>

        {/* ✅ Mobile */}
        <div className="flex md:hidden items-center bg-white rounded-xl border px-4 py-3">
          <input
            type="text"
            placeholder="Search expeditions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none"
          />
          <button type="submit">
            <Search className="h-5 w-5 text-amber-700" />
          </button>
        </div>

        {/* ✅ Desktop */}
        <div className="hidden md:flex gap-4">
          <input
            type="text"
            placeholder="Search expeditions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border"
          />

          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          >
            <option value="all">All</option>
            <option value="trips">Trips</option>
            <option value="treks">Treks</option>
          </select>

          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-4 py-3 rounded-xl border"
          >
            <option value="all">Any Price</option>
            <option value="budget">Under $100</option>
            <option value="standard">$100 – $500</option>
            <option value="premium">Above $500</option>
          </select>

          <button
            type="submit"
            className="px-6 py-3 bg-amber-700 text-white rounded-xl"
          >
            Search
          </button>
        </div>

      </form>
    </div>
  )
}