"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  adminLoginAction,
  adminSignupAction,
  loginAction,
  registerAction,
  requestEmailOtpAction,
  requestWhatsAppOtpAction,
  verifyOtpAction,
  type AuthState,
} from "@/lib/auth/actions";
import { cn } from "@/lib/utils";

type Mode = "login" | "register";
type Tab = "password" | "email" | "whatsapp";

export function AuthForm({ mode }: { mode: Mode }) {
  const [tab, setTab] = useState<Tab>("password");

  if (mode === "register") {
    return <RegisterBlock />;
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6">
      <TabBar tab={tab} onChange={setTab} />
      {tab === "password" ? <PasswordLogin action={loginAction} /> : null}
      {tab === "email" ? <OtpLogin channel="EMAIL" purpose="LOGIN" /> : null}
      {tab === "whatsapp" ? <OtpLogin channel="WHATSAPP" purpose="LOGIN" /> : null}
      <p className="text-muted-foreground text-sm">
        New here?{" "}
        <Link href="/register" className="text-primary font-medium">
          Create a student account
        </Link>
        {" · "}
        <Link href="/admin/login" className="text-primary font-medium">
          Administration
        </Link>
      </p>
    </div>
  );
}

export function AdminAuthForm() {
  const [tab, setTab] = useState<Tab>("password");
  return (
    <div className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6">
      <TabBar tab={tab} onChange={setTab} />
      {tab === "password" ? <PasswordLogin action={adminLoginAction} /> : null}
      {tab === "email" ? <OtpLogin channel="EMAIL" purpose="ADMIN_LOGIN" /> : null}
      {tab === "whatsapp" ? <OtpLogin channel="WHATSAPP" purpose="ADMIN_LOGIN" /> : null}
      <p className="text-muted-foreground text-sm">
        Moderators and Directors only. Students use{" "}
        <Link href="/login" className="text-primary font-medium">
          student sign in
        </Link>
        . Need a staff account?{" "}
        <Link href="/admin/signup" className="text-primary font-medium">
          Admin sign up
        </Link>
        .
      </p>
    </div>
  );
}

function TabBar({ tab, onChange }: { tab: Tab; onChange: (tab: Tab) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1" role="tablist">
      {(
        [
          ["password", "Password"],
          ["email", "Email OTP"],
          ["whatsapp", "WhatsApp"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={tab === id}
          className={cn(
            "rounded-md px-2 py-2 text-xs font-semibold sm:text-sm",
            tab === id ? "bg-white text-navy shadow-sm" : "text-muted-foreground"
          )}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function RegisterBlock() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    registerAction,
    {}
  );
  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6">
      <Field label="Full name" name="name">
        <Input id="name" name="name" required minLength={2} className="h-11" autoComplete="name" />
      </Field>
      <Field label="Email" name="email">
        <Input id="email" name="email" type="email" required className="h-11" autoComplete="email" />
      </Field>
      <Field label="WhatsApp number (optional)" name="phone">
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+91 98765 43210"
          className="h-11"
          autoComplete="tel"
        />
      </Field>
      <Field label="Password" name="password">
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="h-11"
          autoComplete="new-password"
        />
      </Field>
      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 w-full px-5">
        {pending ? "Please wait…" : "Create student account"}
      </Button>
      <p className="text-muted-foreground text-sm">
        Already registered?{" "}
        <Link href="/login" className="text-primary font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export function AdminSignupForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    adminSignupAction,
    {}
  );
  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6">
      <Field label="Full name" name="name">
        <Input id="name" name="name" required minLength={2} className="h-11" autoComplete="name" />
      </Field>
      <Field label="Email" name="email">
        <Input id="email" name="email" type="email" required className="h-11" autoComplete="email" />
      </Field>
      <Field label="WhatsApp number (optional)" name="phone">
        <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className="h-11" autoComplete="tel" />
      </Field>
      <Field label="Password" name="password">
        <Input id="password" name="password" type="password" required minLength={8} className="h-11" autoComplete="new-password" />
      </Field>
      <div className="space-y-1.5">
        <Label htmlFor="role">Role</Label>
        <select
          id="role"
          name="role"
          defaultValue="DIRECTOR"
          className="border-input h-11 w-full rounded-md border bg-white px-3 text-sm"
        >
          <option value="DIRECTOR">Director</option>
          <option value="MODERATOR">Moderator</option>
        </select>
      </div>
      <Field label="Admin setup code" name="signupCode">
        <Input id="signupCode" name="signupCode" required className="h-11" autoComplete="off" />
      </Field>
      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 w-full px-5">
        {pending ? "Please wait…" : "Create admin account"}
      </Button>
      <p className="text-muted-foreground text-sm">
        Already have a staff account?{" "}
        <Link href="/admin/login" className="text-primary font-medium">
          Admin sign in
        </Link>
      </p>
    </form>
  );
}

function PasswordLogin({
  action,
}: {
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, {});
  return (
    <form action={formAction} className="space-y-4">
      <Field label="Email" name="email">
        <Input id="email" name="email" type="email" required className="h-11" autoComplete="email" />
      </Field>
      <Field label="Password" name="password">
        <Input
          id="password"
          name="password"
          type="password"
          required
          className="h-11"
          autoComplete="current-password"
        />
      </Field>
      {state.error ? (
        <p className="text-destructive text-sm" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 w-full px-5">
        {pending ? "Please wait…" : "Sign in"}
      </Button>
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
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      {children}
    </div>
  );
}

function OtpLogin({
  channel,
  purpose,
}: {
  channel: "EMAIL" | "WHATSAPP";
  purpose: "LOGIN" | "ADMIN_LOGIN";
}) {
  const requestAction = channel === "EMAIL" ? requestEmailOtpAction : requestWhatsAppOtpAction;
  const [reqState, reqAction, reqPending] = useActionState<AuthState, FormData>(requestAction, {});
  const [verState, verAction, verPending] = useActionState<AuthState, FormData>(verifyOtpAction, {});

  const step = verState.step || reqState.step;
  const target = verState.target || reqState.target;
  const activeChannel = verState.channel || reqState.channel || channel;
  const error = verState.error || reqState.error;
  const ok = verState.ok || reqState.ok;
  const devCode = verState.devCode || reqState.devCode;

  if (step === "code" && target) {
    return (
      <form action={verAction} className="space-y-4">
        <input type="hidden" name="channel" value={activeChannel} />
        <input type="hidden" name="purpose" value={purpose} />
        <input type="hidden" name="target" value={target} />
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code sent to <span className="text-foreground font-medium">{target}</span>.
        </p>
        {devCode ? (
          <p className="rounded-md border border-dashed border-orange/40 bg-[#fff8ee] px-3 py-2 text-sm text-orange">
            Dev OTP (no email/WhatsApp provider configured): <strong>{devCode}</strong>
          </p>
        ) : null}
        <Field label="Verification code" name="code">
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            required
            className="h-11 tracking-[0.3em]"
            autoComplete="one-time-code"
          />
        </Field>
        {error ? (
          <p className="text-destructive text-sm" role="alert">
            {error}
          </p>
        ) : null}
        {ok && !error ? <p className="text-green text-sm">{ok}</p> : null}
        <Button type="submit" disabled={verPending} className="h-11 w-full px-5">
          {verPending ? "Verifying…" : "Verify and sign in"}
        </Button>
      </form>
    );
  }

  return (
    <form action={reqAction} className="space-y-4">
      <input type="hidden" name="purpose" value={purpose} />
      {channel === "EMAIL" ? (
        <Field label="Email" name="email">
          <Input id="email" name="email" type="email" required className="h-11" autoComplete="email" />
        </Field>
      ) : (
        <Field label="WhatsApp number" name="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            className="h-11"
            autoComplete="tel"
          />
        </Field>
      )}
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      {ok ? <p className="text-green text-sm">{ok}</p> : null}
      <Button type="submit" disabled={reqPending} className="h-11 w-full px-5">
        {reqPending ? "Sending…" : channel === "EMAIL" ? "Send email OTP" : "Send WhatsApp OTP"}
      </Button>
    </form>
  );
}
