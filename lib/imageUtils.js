/**
 * Normalizes image URLs to use the new API endpoint format
 * Converts old /uploads/ URLs to /api/images/ URLs for backward compatibility
 * @param {string} url - The image URL (can be old or new format)
 * @returns {string} - Normalized URL using the API endpoint
 */
export function normalizeImageUrl(url) {
  if (!url) return url
  
  // If it's already using the API endpoint, return as is
  if (url.startsWith("/api/images/")) {
    return url
  }
  
  // If it's an old /uploads/ URL, convert to new format
  if (url.startsWith("/uploads/")) {
    const filename = url.replace("/uploads/", "")
    return `/api/images/${filename}`
  }
  
  // If it's a full URL (http/https) or other format, return as is
  return url
}

