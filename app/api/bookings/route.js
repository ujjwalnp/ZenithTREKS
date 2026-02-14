import { query } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST(req) {
  const session = await getSession()

  try {
    const { tripId, fullName, email, phone, participants, bookingDate } = await req.json()

    // Validate and convert types
    if (!tripId || !fullName || !email || !phone || !participants  || !bookingDate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if(Number(participants)<1){
      return NextResponse.json({error:"Participants cannot be less than 1"}, {status: 406})
    }

    const tripDetails = await query({
      query: `SELECT price FROM trips WHERE id=${tripId};`
    })

    const price = Number(tripDetails[0].price);
    const total_price = (price*parseInt(participants))*((0.95)**(Number(participants)-1));

    const result = await query({
      query: `INSERT INTO bookings 
        (user_id, trip_id, full_name, email, phone, participants, total_price, booking_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        session?.id ? parseInt(session.id) : null,
        parseInt(tripId),
        String(fullName),
        String(email),
        String(phone),
        parseInt(participants),
        parseFloat(total_price),
        String(bookingDate),
      ],
    })

    return NextResponse.json({ id: result.insertId, message: "Booking successful" }, { status: 201 })
  } catch (error) {
    console.error("[ramhimalayan] Booking error:", error)
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 })
  }
}

export async function GET(req) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    // Admins can see all bookings, regular users see only their own
    const isAdmin = session.role === "admin"
    const querySql = isAdmin
      ? `SELECT b.*, t.title as trip_title, t.thumbnail, u.name as user_name, u.email as user_email
         FROM bookings b 
         JOIN trips t ON b.trip_id = t.id 
         LEFT JOIN users u ON b.user_id = u.id
         ORDER BY b.created_at DESC`
      : `SELECT b.*, t.title as trip_title, t.thumbnail 
         FROM bookings b 
         JOIN trips t ON b.trip_id = t.id 
         WHERE b.user_id = ? 
         ORDER BY b.created_at DESC`
    
    const bookings = await query({
      query: querySql,
      values: isAdmin ? [] : [parseInt(session.id)],
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error("[ramhimalayan] Bookings fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
