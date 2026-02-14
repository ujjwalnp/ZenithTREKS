import { query } from "@/lib/db"
import { getSession, isAdmin } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function PATCH(req, { params }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Only admins can update bookings" }, { status: 403 })
  }

  try {
    const { id } = await params
    const { status } = await req.json()

    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    await query({
      query: "UPDATE bookings SET status = ? WHERE id = ?",
      values: [status, parseInt(id)],
    })

    return NextResponse.json({ message: "Booking status updated successfully" })
  } catch (error) {
    console.error("[ramhimalayan] Booking update error:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}


