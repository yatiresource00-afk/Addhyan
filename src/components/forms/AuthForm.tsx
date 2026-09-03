"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, registerAction, type AuthState } from "@/lib/auth/actions";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const action = mode === "login" ? loginAction : registerAction;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6">
      {mode === "register" ? (
        <Field label="Full name" name="name" autoComplete="name">
          <Input id="name" name="name" required minLength={2} className="h-11" autoComplete="name" />
        </Field>
      ) : null}
      <Field label="Email" name="email">
        <Input id="email" name="email" type="email" required className="h-11" autoComplete="email" />
      </Field>
      <Field label="Password" name="password">
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={mode === "register" ? 8 : 1}
          className="h-11"
          autoComplete={mode === "register" ? "new-password" : "current-password"}
        />
      </Field>
      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 w-full px-5">
        {pending ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
      </Button>
      <p className="text-muted-foreground text-sm">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/register" className="text-primary font-medium">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  autoComplete?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      {children}
    </div>
  );
}
