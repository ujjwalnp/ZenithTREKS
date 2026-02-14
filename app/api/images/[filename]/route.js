import { NextResponse } from "next/server"
import path from "path"
import { readFile } from "fs/promises"
import { existsSync } from "fs"

export async function GET(req, { params }) {
  try {
    const { filename } = await params

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    // Security: Prevent directory traversal attacks
    if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 })
    }

    // Try new location first (root uploads directory)
    let filePath = path.join(process.cwd(), "uploads", filename)
    
    // If not found, try old location (public/uploads) for backward compatibility
    if (!existsSync(filePath)) {
      const oldFilePath = path.join(process.cwd(), "public", "uploads", filename)
      if (existsSync(oldFilePath)) {
        filePath = oldFilePath
      }
    }

    // Check if file exists
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Read the file
    const fileBuffer = await readFile(filePath)

    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase()
    const contentTypeMap = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    }

    const contentType = contentTypeMap[ext] || "application/octet-stream"

    // Return the image with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("[ramhimalayan] Image serving error:", error)
    return NextResponse.json({ error: "Failed to serve image" }, { status: 500 })
  }
}

