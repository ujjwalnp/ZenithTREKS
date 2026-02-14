import { NextResponse } from "next/server"
import path from "path"
import { mkdir, readFile, readdir, writeFile } from "fs/promises"
import { existsSync } from "fs"
import { isAdmin } from "@/lib/auth"

const GALLERY_DIR = path.join(process.cwd(), "uploads", "gallery")
const ALLOWED_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"]

export async function GET() {
  try {
    if (!existsSync(GALLERY_DIR)) {
      return NextResponse.json([])
    }

    const files = await readdir(GALLERY_DIR)
    const images = files
      .filter((file) => ALLOWED_EXTS.includes(path.extname(file).toLowerCase()))
      .map((filename) => ({
        filename,
        url: `/api/gallery/${filename}`,
      }))

    return NextResponse.json(images)
  } catch (error) {
    console.error("[ramhimalayan] Gallery list error:", error)
    return NextResponse.json({ error: "Failed to list gallery images" }, { status: 500 })
  }
}

export async function POST(req) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    const ext = path.extname(file.name).toLowerCase()
    if (!ALLOWED_EXTS.includes(ext)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const safeName = file.name.replaceAll(" ", "_")
    const filename = `${Date.now()}-${safeName}`

    await mkdir(GALLERY_DIR, { recursive: true })
    await writeFile(path.join(GALLERY_DIR, filename), buffer)

    return NextResponse.json({ filename, url: `/api/gallery/${filename}` }, { status: 201 })
  } catch (error) {
    console.error("[ramhimalayan] Gallery upload error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}

