import { query } from "@/lib/db"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const users = await query({
      query: "SELECT * FROM users WHERE email = ?",
      values: [email],
    })

    if (users.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0]
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createToken(user)
    ;(await cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("ramhimalayan Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
