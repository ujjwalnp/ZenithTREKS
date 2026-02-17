import { query } from "@/lib/db"
import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"

export async function GET() {
  try {
    const trips = await query({
      query: "SELECT * FROM trips ORDER BY created_at DESC",
    })
    return NextResponse.json(trips)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 })
  }
}

export async function POST(req) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const { title, country, description, price, duration, thumbnail, slug } = await req.json()

    // Basic slug generation/fallback in case API is called directly without slug
    const baseSlug =
      slug && slug.trim().length > 0
        ? slug.trim()
        : title
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")

    const result = await query({
      query: "INSERT INTO trips (title, slug, country, description, price, duration, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)",
      values: [title, baseSlug, country, description, price, duration, thumbnail],
    })

    return NextResponse.json({ id: result.insertId, message: "Trip created successfully" }, { status: 201 })
  } catch (error) {
    console.error("[ramhimalayan] Trip creation error:", error)
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 })
  }
}
