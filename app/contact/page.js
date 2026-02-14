"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/Footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState({ type: "", message: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: "info", message: "Sending your message..." })

    try {
      // Simulate API call for contact form
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus({ type: "success", message: "Thank you! Your message has been sent successfully." })
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setStatus({ type: "error", message: "Something went wrong. Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <img src="/himalayan-prayer-flags-mountain-background.jpg" alt="Contact Us Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl text-stone-200 max-w-2xl mx-auto">
            Have questions about your next adventure? Our Himalayan experts are here to help.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Get in Touch</h2>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Whether you're planning a trek to Everest Base Camp or want a custom tour of Bhutan, we're ready to make
                your dream journey a reality.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Our Location</h3>
                  <p className="text-stone-600">Thamel, Kathmandu, Nepal</p>
                  <p className="text-stone-600">Post Box: 44600</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Call Us</h3>
                  <p className="text-stone-600">+977-1-4XXXXXX</p>
                  <p className="text-stone-600">+977-98XXXXXXXX (WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Email Us</h3>
                  <p className="text-stone-600">info@ramhimalayan.com</p>
                  <p className="text-stone-600">bookings@ramhimalayan.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">Working Hours</h3>
                  <p className="text-stone-600">Sun - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-stone-600">Sat: Closed (Available for emergencies)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
            <div className="flex items-center space-x-3 mb-8">
              <MessageSquare className="h-8 w-8 text-emerald-700" />
              <h2 className="text-3xl font-bold text-stone-900">Send a Message</h2>
            </div>

            {status.message && (
              <div
                className={`mb-8 p-4 rounded-xl text-sm font-medium ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : status.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-100"
                      : "bg-stone-50 text-stone-700 border border-stone-100"
                }`}
              >
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none"
                  placeholder="Share your travel requirements or questions..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto px-10 py-4 bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/20 hover:bg-emerald-800 transition-all flex items-center justify-center space-x-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                {!loading && <Send className="h-5 w-5" />}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-stone-200 mt-10">
        {/* In a real app, you would embed a Google Map here */}
        <div className="w-full h-full flex items-center justify-center bg-stone-100 border-t border-stone-200">
          <div className="text-center p-8">
            <MapPin className="h-12 w-12 text-emerald-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-stone-900 mb-2">Find Us in Kathmandu</h3>
            <p className="text-stone-600">Thamel, the heart of Nepal's trekking hub.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
