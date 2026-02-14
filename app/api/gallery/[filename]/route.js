import { NextResponse } from "next/server"
import path from "path"
import { readFile, unlink } from "fs/promises"
import { existsSync } from "fs"
import { isAdmin } from "@/lib/auth"

const GALLERY_DIR = path.join(process.cwd(), "uploads", "gallery")
const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
}

const isInvalidName = (filename) => filename.includes("..") || filename.includes("/") || filename.includes("\\")

export async function GET(req, { params }) {
  try {
    const { filename } = await params

    if (!filename || isInvalidName(filename)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 })
    }

    const filePath = path.join(GALLERY_DIR, filename)
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const fileBuffer = await readFile(filePath)
    const contentType = CONTENT_TYPES[path.extname(filename).toLowerCase()] || "application/octet-stream"

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("[ramhimalayan] Gallery image fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const { filename } = await params

    if (!filename || isInvalidName(filename)) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 })
    }

    const filePath = path.join(GALLERY_DIR, filename)
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    await unlink(filePath)
    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    console.error("[ramhimalayan] Gallery delete error:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}

