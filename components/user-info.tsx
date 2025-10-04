"use client"

import useSWR from "swr"

type MeResponse = { user: { id: string; email: string; role: "user" | "admin"; name?: string } } | { error: string }

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" })
  if (!res.ok) throw new Error("Unauthorized")
  return res.json()
}

export function UserInfo({ compact = false }: { compact?: boolean }) {
  const { data, error, isLoading, mutate } = useSWR<MeResponse>("/api/auth/me", fetcher)

  if (isLoading) return <div className="text-sm text-muted-foreground">Loading user...</div>
  if (error || !data || "error" in data) {
    return <div className="text-sm">Not signed in</div>
  }

  const { user } = data
  return (
    <div className={compact ? "text-sm" : "space-y-1"}>
      <div className="font-medium">{user.name || user.email}</div>
      <div className="text-muted-foreground text-sm">Role: {user.role}</div>
      {!compact && (
        <button
          className="mt-2 inline-flex items-center rounded-md px-3 py-1.5 bg-primary text-primary-foreground"
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" })
            mutate(undefined, { revalidate: false })
            // Optional: force refresh so middleware redirects /login, etc.
            window.location.reload()
          }}
        >
          Logout
        </button>
      )}
    </div>
  )
}
