"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createUserAction,
  updateUserRoleAction,
  type AdminState,
} from "@/lib/admin/actions";

export function CreateUserForm({ canAssignStaff }: { canAssignStaff: boolean }) {
  const [state, action, pending] = useActionState<AdminState, FormData>(createUserAction, {});
  return (
    <form action={action} className="space-y-3 rounded-xl border border-border bg-white p-5">
      <h2 className="font-heading text-lg font-semibold text-navy">Create user</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">WhatsApp</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91…" className="h-10" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required minLength={8} className="h-10" />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            name="role"
            className="border-input h-10 w-full rounded-md border bg-white px-3 text-sm"
            defaultValue="STUDENT"
          >
            <option value="STUDENT">Student</option>
            {canAssignStaff ? (
              <>
                <option value="MODERATOR">Moderator</option>
                <option value="DIRECTOR">Director</option>
              </>
            ) : null}
          </select>
        </div>
      </div>
      {state.error ? <p className="text-destructive text-sm">{state.error}</p> : null}
      {state.ok ? <p className="text-green text-sm">{state.ok}</p> : null}
      <Button type="submit" disabled={pending} className="h-10 px-4">
        {pending ? "Saving…" : "Create"}
      </Button>
    </form>
  );
}

export function RoleSelectForm({
  userId,
  role,
}: {
  userId: string;
  role: string;
}) {
  const [state, action, pending] = useActionState<AdminState, FormData>(
    updateUserRoleAction,
    {}
  );
  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <select
        name="role"
        defaultValue={role}
        className="border-input h-9 rounded-md border bg-white px-2 text-sm"
      >
        <option value="STUDENT">Student</option>
        <option value="MODERATOR">Moderator</option>
        <option value="DIRECTOR">Director</option>
      </select>
      <Button type="submit" variant="outline" disabled={pending} className="h-9 px-3">
        Save
      </Button>
      {state.error ? <span className="text-destructive text-xs">{state.error}</span> : null}
    </form>
  );
}
