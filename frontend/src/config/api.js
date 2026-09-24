// Central API configuration
// In production: uses VITE_API_URL (your Render backend)
// In development: uses empty string (proxied via Vite to localhost)
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
