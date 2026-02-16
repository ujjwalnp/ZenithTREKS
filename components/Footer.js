import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const MastercardIcon = ({ className }) => (
  <svg 
    viewBox="0 0 48 32" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Mastercard"
  >
    <circle cx="16" cy="16" r="14" fill="#EB001B"/>
    <circle cx="32" cy="16" r="14" fill="#F79E1B"/>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 text-stone-300">


      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 sm:mb-6 group">
              <Image 
                src="/logo.png" 
                alt="Zenith TREKS & Expedition" 
                width={120} 
                height={40} 
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </Link>
            <p className="text-stone-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Discover the Himalayas with seasoned guides and experiences you’ll never forget. Your journey starts today.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-stone-900 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-stone-900 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-stone-900 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/trips" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block text-sm sm:text-base">
                  All Expeditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block text-sm sm:text-base">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block text-sm sm:text-base">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">View Expedition Types</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/destinations/trips" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block text-sm sm:text-base">
                  Trips
                </Link>
              </li>
              <li>
                <Link href="/destinations/treks" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block text-sm sm:text-base">
                  Treks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact Us</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-stone-400 text-sm sm:text-base">
                  Budhanilkantha, Kathmandu<br />
                  Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                <a href="tel:+9779844159245" className="text-stone-400 hover:text-emerald-500 transition-colors text-sm sm:text-base break-all">
                  +977 9844159245
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                <a href="mailto:trekszenith@gmail.com" className="text-stone-400 hover:text-emerald-500 transition-colors text-sm sm:text-base break-all">
                  info@zenithtrekexped.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-stone-500 text-xs sm:text-sm text-center md:text-left">
            © {currentYear} Zenith Treks & Expedition. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-stone-500 hover:text-emerald-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-stone-500 hover:text-emerald-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-stone-500 hover:text-emerald-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
            <MastercardIcon className="h-5 w-auto opacity-80" />
          </div>
        </div>
      </div>

      {/* Powered By */}
      <div className=" border-stone-800 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-stone-500 text-xs sm:text-sm text-center">
            Powered by{' '}
            <a 
              href="https://techsapana.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-emerald-400 transition-colors"
            >
              TechSapana
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}