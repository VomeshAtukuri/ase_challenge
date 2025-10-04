import { cookies } from "next/headers"

export type AppUser = {
  email: string
  role: "user" | "admin"
}

const COOKIE_EMAIL = "email"
const COOKIE_ROLE = "role"

export async function getUser(): Promise<AppUser | null> {
  const store = await cookies()
  const email = store.get(COOKIE_EMAIL)?.value
  const role = store.get(COOKIE_ROLE)?.value as AppUser["role"] | undefined
  if (!email || !role) return null
  if (role !== "user" && role !== "admin") return null
  return { email, role }
}

export async function isAdmin(): Promise<boolean> {
  return (await getUser())?.role === "admin"
}
