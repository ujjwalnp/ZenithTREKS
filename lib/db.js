import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "ram_himalayan_travels",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function query({ query: sql, values = [] }) {
  try {
    const [results] = await pool.execute(sql, values)
    return results
  } catch (error) {
    console.error("[ramhimalayan] Database query error:", error.message)
    throw error
  }
}
