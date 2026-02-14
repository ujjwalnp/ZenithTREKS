import { query } from "@/lib/db"
import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const trips = await query({
      query: "SELECT * FROM trips WHERE id = ?",
      values: [id],
    })

    if (trips.length === 0) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }

    return NextResponse.json(trips[0])
  } catch (error) {
    console.error("[ramhimalayan] Trip fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch trip" }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params

  try {
    const { title, country, description, price, thumbnail, slug } = await req.json()

    const baseSlug =
      slug && slug.trim().length > 0
        ? slug.trim()
        : title
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")

    await query({
      query:
        "UPDATE trips SET title = ?, slug = ?, country = ?, description = ?, price = ?, thumbnail = ? WHERE id = ?",
      values: [title, baseSlug, country, description, price, thumbnail, id],
    })

    return NextResponse.json({ message: "Trip updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update trip" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { id } = await params

  try {
    await query({
      query: "DELETE FROM trips WHERE id = ?",
      values: [id],
    })
    return NextResponse.json({ message: "Trip deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete trip" }, { status: 500 })
  }
}
