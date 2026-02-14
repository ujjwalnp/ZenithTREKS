import { query } from "@/lib/db"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const existing = await query({
      query: "SELECT id FROM users WHERE email = ?",
      values: [email],
    })

    if (existing.length > 0) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await query({
      query: "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      values: [name, email, hashedPassword],
    })

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 })
  } catch (error) {
    console.error("ramhimalayan Signup error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
