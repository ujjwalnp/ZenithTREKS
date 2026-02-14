import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev"

export async function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "7d" })
}

export async function getSession() {
  const token = (await cookies()).get("auth_token")?.value
  if (!token) return null

  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error("ramhimalayan Session verification error:", error.message)
    return null
  }
}

export async function isAdmin() {
  const session = await getSession()
  return session?.role === "admin"
}
