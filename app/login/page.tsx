import { getUser } from "@/lib/auth"
import LoginForm from "@/components/login-form"
import { Button } from "@/components/ui/button"

async function logoutAction() {
  "use server"
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/auth/logout`, { method: "POST", cache: "no-store" })
}

export default async function LoginPage() {
  const user = getUser()

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold text-pretty">Login</h1>

      {user ? (
        <div className="space-y-4 rounded-lg border bg-card p-4">
          <div className="text-sm">
            <div>
              <span className="font-medium">Email:</span> {user.email}
            </div>
            <div>
              <span className="font-medium">Role:</span> {user.role}
            </div>
            {user.role === "admin" && (
              <div className="mt-2 rounded-md bg-muted p-3 text-xs">
                <span className="font-medium">Admin details:</span> You can add new products from the homepage.
              </div>
            )}
          </div>

          <form action={logoutAction}>
            <Button type="submit" variant="secondary">
              Logout
            </Button>
          </form>
        </div>
      ) : (
        <LoginForm />
      )}
    </main>
  )
}
