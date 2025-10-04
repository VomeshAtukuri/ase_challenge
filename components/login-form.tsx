"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mutate } from "swr";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Login failed");
      }
      toast.message("Login successful", {
        description: "Welcome back!",
      });
      await mutate("/api/auth/me"); // refresh navbar auth state immediately
      router.push("/");
      router.refresh();
    } catch (err: any) {
      toast.message("Login error", {
        description: err.message || "Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-lg border bg-card p-4 shadow-md md:w-[400px]"
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@shop.test"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          Admin credentials:
          <br />
          <code className="px-1 py-0.5 rounded bg-muted text-muted-foreground">
            admin@shop.test
          </code>{" "}
          /{" "}
          <code className="px-1 py-0.5 rounded bg-muted text-muted-foreground">
            admin123
          </code>
        </p>

        <p>
          User credentials:
          <br />
          <code className="px-1 py-0.5 rounded bg-muted text-muted-foreground">
            user@shop.test
          </code>{" "}
          /{" "}
          <code className="px-1 py-0.5 rounded bg-muted text-muted-foreground">
            user123
          </code>
        </p>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
