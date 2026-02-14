import { NextResponse } from "next/server"
import path from "path"
import { writeFile, mkdir } from "fs/promises"
import { isAdmin } from "@/lib/auth"

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

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`
    const uploadDir = path.join(process.cwd(), "uploads")

    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (err) {
      // Ignore if exists
    }

    await writeFile(path.join(uploadDir, filename), buffer)

    return NextResponse.json({ url: `/api/images/${filename}` }, { status: 201 })
  } catch (error) {
    console.error("[ramhimalayan] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
