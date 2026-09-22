"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveSiteSettingsAction, type AdminState } from "@/lib/admin/actions";

export function SiteSettingsForm({
  values,
}: {
  values: Record<string, string>;
}) {
  const [state, action, pending] = useActionState<AdminState, FormData>(
    saveSiteSettingsAction,
    {}
  );
  return (
    <form action={action} className="space-y-4 rounded-xl border border-border bg-white p-5">
      <div className="space-y-1.5">
        <Label htmlFor="site_tagline">Tagline</Label>
        <Input
          id="site_tagline"
          name="site_tagline"
          defaultValue={values.site_tagline ?? ""}
          className="h-10"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="announcement">Homepage announcement</Label>
        <Textarea
          id="announcement"
          name="announcement"
          rows={3}
          defaultValue={values.announcement ?? ""}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="contact_email">Contact email</Label>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            defaultValue={values.contact_email ?? ""}
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact_phone">Contact phone</Label>
          <Input
            id="contact_phone"
            name="contact_phone"
            defaultValue={values.contact_phone ?? ""}
            className="h-10"
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact_address">Address</Label>
        <Textarea
          id="contact_address"
          name="contact_address"
          rows={2}
          defaultValue={values.contact_address ?? ""}
        />
      </div>
      {state.error ? <p className="text-destructive text-sm">{state.error}</p> : null}
      {state.ok ? <p className="text-green text-sm">{state.ok}</p> : null}
      <Button type="submit" disabled={pending} className="h-10 px-4">
        {pending ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
