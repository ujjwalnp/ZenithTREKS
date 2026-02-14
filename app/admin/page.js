"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import RichTextEditor from "@/components/RichTextEditor"
import { normalizeImageUrl } from "@/lib/imageUtils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, ImageIcon, Loader2, Package, Calendar, Users, DollarSign, MapPin, CheckCircle2, XCircle, Clock } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("trips")
  const [trips, setTrips] = useState([])
  const [bookings, setBookings] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    country: "trips",
    price: "",
    thumbnail: "",
    description: "",
  })
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (activeTab === "trips") fetchTrips()
    if (activeTab === "bookings") fetchBookings()
    if (activeTab === "gallery") fetchGallery()
  }, [activeTab])

  const fetchTrips = async () => {
    try {
      const res = await fetch("/api/trips")
      const data = await res.json()
      setTrips(data)
    } catch (err) {
      console.error("[ramhimalayan] Failed to fetch trips")
    } finally {
      setLoading(false)
    }
  }

  const fetchBookings = async () => {
    setBookingsLoading(true)
    try {
      const res = await fetch("/api/bookings")
      if (res.ok) {
        const data = await res.json()
        setBookings(data)
      }
    } catch (err) {
      console.error("[ramhimalayan] Failed to fetch bookings")
    } finally {
      setBookingsLoading(false)
    }
  }

  const fetchGallery = async () => {
    setGalleryLoading(true)
    try {
      const res = await fetch("/api/gallery")
      if (res.ok) {
        const data = await res.json()
        setGalleryImages(data)
      }
    } catch (err) {
      console.error("[ramhimalayan] Failed to fetch gallery images")
    } finally {
      setGalleryLoading(false)
    }
  }

  const uploadGalleryImage = async (file) => {
    if (!file) return
    setGalleryUploading(true)
    const body = new FormData()
    body.append("file", file)

    try {
      const res = await fetch("/api/gallery", { method: "POST", body })
      if (res.ok) {
        await fetchGallery()
      } else {
        alert("Upload failed")
      }
    } catch (err) {
      console.error("[ramhimalayan] Gallery upload failed", err)
      alert("Upload failed")
    } finally {
      setGalleryUploading(false)
    }
  }

  const deleteGalleryImage = async (filename) => {
    if (!confirm("Delete this image?")) return
    try {
      const res = await fetch(`/api/gallery/${encodeURIComponent(filename)}`, { method: "DELETE" })
      if (res.ok) {
        setGalleryImages((imgs) => imgs.filter((img) => img.filename !== filename))
      } else {
        alert("Failed to delete image")
      }
    } catch (err) {
      console.error("[ramhimalayan] Delete image failed", err)
      alert("Failed to delete image")
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    const body = new FormData()
    body.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      })
      const data = await res.json()
      if (data.url) {
        setFormData({ ...formData, thumbnail: data.url })
      }
    } catch (err) {
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = editingTrip ? "PUT" : "POST"
    const url = editingTrip ? `/api/trips/${editingTrip.id}` : "/api/trips"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setIsModalOpen(false)
        setEditingTrip(null)
        setFormData({ title: "", slug: "", country: "trips", price: "", thumbnail: "", description: "" })
        fetchTrips()
      }
    } catch (err) {
      alert("Action failed")
    }
  }

  const deleteTrip = async (id) => {
    if (!confirm("Are you sure?")) return
    try {
      await fetch(`/api/trips/${id}`, { method: "DELETE" })
      fetchTrips()
    } catch (err) {
      alert("Delete failed")
    }
  }

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        fetchBookings()
      } else {
        alert("Failed to update booking status")
      }
    } catch (err) {
      console.error("Failed to update booking:", err)
      alert("Failed to update booking status")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
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
        <Loader2 className="h-10 w-10 animate-spin text-emerald-700" />
      </div>
    )
  }

  return (
    <main className="bg-stone-50 min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-stone-900">Admin Dashboard</h1>
          <p className="text-stone-500 mt-2 font-medium">Manage your Himalayan expeditions and bookings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border border-stone-200 rounded-xl p-1 mb-8">
            <TabsTrigger value="trips" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              <Package className="h-4 w-4 mr-2" />
              Trips
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white">
              <ImageIcon className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="mt-0">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-stone-900">Manage Trips</h2>
              <button
                onClick={() => {
                  setEditingTrip(null)
                  setFormData({ title: "", slug: "", country: "trips", price: "", thumbnail: "", description: "" })
                  setIsModalOpen(true)
                }}
                className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold flex items-center shadow-lg hover:bg-emerald-800 transition-all"
              >
                <Plus className="mr-2 h-5 w-5" /> Add New Trip
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 flex flex-col grow"
                >
                  <div className="relative h-48 bg-stone-200">
                    {trip.thumbnail ? (
                      <img
                        src={normalizeImageUrl(trip.thumbnail) || "/placeholder.svg"}
                        alt={trip.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400">
                        <ImageIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 grow">
                    <h3 className="text-xl font-bold text-stone-900 mb-1">{trip.title}</h3>
                    <p className="text-emerald-700 font-bold mb-4">$ {Number(trip.price).toLocaleString()}</p>
                    <div className="flex items-center space-x-3 pt-4 border-t border-stone-100">
                      <button
                        onClick={() => {
                          setEditingTrip(trip)
                          setFormData({
                            title: trip.title,
                            slug: trip.slug || "",
                            country: trip.country,
                            price: trip.price,
                            thumbnail: trip.thumbnail,
                            description: trip.description,
                          })
                          setIsModalOpen(true)
                        }}
                        className="flex-1 py-2 rounded-lg bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 transition-colors flex items-center justify-center"
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </button>
                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-0">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-stone-900">All Bookings</h2>
              <p className="text-stone-500 mt-1">Manage and update booking statuses</p>
            </div>

            {bookingsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-stone-100">
                <Package className="h-16 w-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-stone-700 mb-2">No Bookings Yet</h3>
                <p className="text-stone-500">Bookings will appear here once customers make reservations.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-black text-stone-900 mb-1">{booking.trip_title}</h3>
                            <div className="flex items-center space-x-4 text-stone-500 text-sm">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>Booking ID: #{booking.id}</span>
                              </div>
                              {booking.user_name && (
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>{booking.user_name}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center space-x-1 ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {getStatusIcon(booking.status)}
                            <span>{booking.status || "pending"}</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-stone-600">
                            <Users className="h-5 w-5 text-emerald-700" />
                            <div>
                              <p className="text-xs font-bold uppercase text-stone-400">Participants</p>
                              <p className="font-bold">{booking.participants}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-stone-600">
                            <Calendar className="h-5 w-5 text-emerald-700" />
                            <div>
                              <p className="text-xs font-bold uppercase text-stone-400">Booking Date</p>
                              <p className="font-bold">{formatDate(booking.booking_date)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-stone-600">
                            <Calendar className="h-5 w-5 text-emerald-700" />
                            <div>
                              <p className="text-xs font-bold uppercase text-stone-400">Booked On</p>
                              <p className="font-bold">{formatDate(booking.created_at)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-stone-600">
                            <div>
                              <p className="text-xs font-bold uppercase text-stone-400">Total Price</p>
                              <p className="font-black text-emerald-700">${Number(booking.total_price).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-stone-200">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
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

                      <div className="lg:w-48 flex flex-col space-y-2">
                        <label className="text-xs font-bold uppercase text-stone-400 mb-1">Update Status</label>
                        <select
                          value={booking.status || "pending"}
                          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                          className="px-4 py-2 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="gallery" className="mt-0">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">Gallery Images</h2>
                <p className="text-stone-500 mt-1">Upload and manage gallery photos</p>
              </div>
              <label className="inline-flex items-center space-x-2 bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-800 transition-all cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>{galleryUploading ? "Uploading..." : "Upload Image"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      uploadGalleryImage(file)
                      e.target.value = ""
                    }
                  }}
                  disabled={galleryUploading}
                />
              </label>
            </div>

            {galleryLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-700" />
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-stone-100">
                <ImageIcon className="h-16 w-16 text-stone-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-stone-700 mb-2">No images yet</h3>
                <p className="text-stone-500">Upload images to build your gallery.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img) => (
                  <div key={img.filename} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm relative">
                    <img src={normalizeImageUrl(img.url)} alt={img.filename} className="w-full h-64 object-cover" />
                    <button
                      onClick={() => deleteGalleryImage(img.filename)}
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-600 rounded-full p-2 shadow"
                      title="Delete image"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="px-4 py-3 text-xs text-stone-500 break-all border-t border-stone-100">{img.filename}</div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Trip Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">{editingTrip ? "Edit Trip" : "Create New Trip"}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Trip Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.title}
                    onChange={(e) => {
                      const newTitle = e.target.value
                      setFormData((prev) => ({
                        ...prev,
                        title: newTitle,
                        // Auto-generate slug only if user hasn't manually typed one
                        slug:
                          prev.slug && prev.slug.length > 0
                            ? prev.slug
                            : newTitle
                                .toString()
                                .toLowerCase()
                                .trim()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-+|-+$/g, ""),
                      }))
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Slug (optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="auto-generated from title if left blank"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Type</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option value="trips">Trip</option>
                    <option value="treks">Trek</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Thumbnail</label>
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex-1 px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-500 text-sm flex items-center justify-center cursor-pointer hover:bg-stone-100 transition-all overflow-hidden"
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <ImageIcon className="h-4 w-4 mr-2" />
                      )}
                      {formData.thumbnail ? "Change Image" : "Upload Image"}
                    </label>
                  </div>
                  {formData.thumbnail && (
                    <img src={normalizeImageUrl(formData.thumbnail)} alt="Thumbnail" className="mt-2 h-20 w-20 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Description (Rich Text Editor)</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="Enter trip description with rich formatting..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl font-bold text-stone-600 hover:bg-stone-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-800 transition-all"
                >
                  {editingTrip ? "Update Trip" : "Create Trip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
