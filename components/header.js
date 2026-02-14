"use client"

import { usePathname } from "next/navigation"
import Navbar from "./navbar"

export default function Header() {
  const pathname = usePathname()

  // Define routes where the header should NOT be displayed
  const excludedRoutes = ["/login", "/signup", "/admin/login"]

  if (excludedRoutes.includes(pathname)) {
    return null
  }

  return <Navbar />
}
