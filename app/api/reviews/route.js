import { NextResponse } from "next/server"
import { query } from "@/lib/db"

// GET /api/reviews?limit=3&page=1
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get("limit") || "3", 10), 20)
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1)
    const offset = (page - 1) * limit

    const reviews = await query({
      query: `
        SELECT id, name, rating, description, created_at
        FROM reviews
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `,
      values: [limit, offset],
    })

    const [{ total }] = await query({
      query: "SELECT COUNT(*) as total FROM reviews",
    })

    return NextResponse.json({
      data: reviews,
      meta: {
        total,
        page,
        limit,
        hasMore: offset + reviews.length < total,
      },
    })
  } catch (error) {
    console.error("[ramhimalayan] Reviews fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

// POST /api/reviews
export async function POST(req) {
  try {
    const { name, rating, description } = await req.json()

    if (!name || !rating || !description) {
      return NextResponse.json({ error: "Name, rating, and review are required" }, { status: 400 })
    }

    const numericRating = parseInt(rating, 10)
    if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5 stars" }, { status: 400 })
    }

    const trimmedName = String(name).trim()
    const trimmedDescription = String(description).trim()

    if (!trimmedName || !trimmedDescription) {
      return NextResponse.json({ error: "Name and review cannot be empty" }, { status: 400 })
    }

    const result = await query({
      query: `
        INSERT INTO reviews (name, rating, description)
        VALUES (?, ?, ?)
      `,
      values: [trimmedName, numericRating, trimmedDescription],
    })

    return NextResponse.json(
      {
        id: result.insertId,
        message: "Thank you for your review!",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[ramhimalayan] Review create error:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}

