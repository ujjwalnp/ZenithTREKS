"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

function StarRating({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="group"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= value ? "text-yellow-400 fill-yellow-400" : "text-stone-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [description, setDescription] = useState("")

  async function fetchReviews(pageToLoad = 1, append = false) {
    try {
      setLoading(true)
      const res = await fetch(`/api/reviews?limit=3&page=${pageToLoad}`)
      if (!res.ok) throw new Error("Failed to load reviews")
      const data = await res.json()

      setReviews((prev) => (append ? [...prev, ...data.data] : data.data))
      setHasMore(data.meta?.hasMore)
      setPage(data.meta?.page || pageToLoad)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews(1, false)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!name.trim() || !description.trim()) {
      setError("Please fill in your name and review.")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, rating, description }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review")
      }

      setSuccess("Thank you for your review!")
      setName("")
      setRating(5)
      setDescription("")

      // Reload first page to show newest review
      fetchReviews(1, false)
    } catch (err) {
      console.error(err)
      setError(err.message || "Something went wrong while submitting your review.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-24 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Write a Review */}
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">
              Share Your Experience
            </h2>
            <h3 className="text-3xl font-bold text-stone-900 mb-6">Write a Review</h3>
            <p className="text-stone-600 mb-6 text-sm">
              Tell future travelers about your journey with Zenith TREKS & Expedition.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-stone-50"
                  placeholder="First name, or full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Star Rating
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 bg-stone-50 resize-none"
                  placeholder="Share what you loved, what stood out, and any tips for others..."
                  required
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
              {success && <p className="text-sm text-emerald-700">{success}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Recent Reviews */}
          <div>
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3">
              Traveler Reviews
            </h2>
            <h3 className="text-3xl font-bold text-stone-900 mb-6">What Guests Are Saying</h3>

            {reviews.length === 0 && !loading && (
              <p className="text-stone-500 text-sm">
                No reviews yet. Be the first to share your experience!
              </p>
            )}

            <div className="space-y-4">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-stone-900">{review.name}</h4>
                    <span className="text-xs text-stone-400">
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-stone-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">{review.description}</p>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => fetchReviews(page + 1, true)}
                  disabled={loading}
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 disabled:opacity-60"
                >
                  {loading ? "Loading..." : "Show more reviews"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

