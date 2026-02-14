import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    ;(await cookies()).delete("auth_token")
    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("ramhimalayan Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}


