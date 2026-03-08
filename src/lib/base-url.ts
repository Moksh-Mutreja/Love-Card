/**
 * Get the base URL for the application.
 * Uses NEXT_PUBLIC_APP_URL environment variable for production.
 * Falls back to http://localhost:3000 for local development.
 */
export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
