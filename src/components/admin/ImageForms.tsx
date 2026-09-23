"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  deleteSiteImageAction,
  uploadSiteImageAction,
  type ImageState,
} from "@/lib/admin/image-actions";

export function UploadImageForm() {
  const [state, action, pending] = useActionState<ImageState, FormData>(
    uploadSiteImageAction,
    {}
  );
  return (
    <form action={action} className="space-y-4 rounded-xl border border-border bg-white p-5">
      <h2 className="font-heading text-lg font-semibold text-navy">Add an image</h2>
      <div className="space-y-1.5">
        <Label htmlFor="image">Image file</Label>
        <Input id="image" name="image" type="file" accept="image/jpeg,image/png,image/webp" required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="alt">Description</Label>
        <Input id="alt" name="alt" required placeholder="Students in a classroom" className="h-10" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="placement">Show on</Label>
        <select
          id="placement"
          name="placement"
          defaultValue="gallery"
          className="border-input h-10 w-full rounded-md border bg-white px-3 text-sm"
        >
          <option value="hero">Homepage main photo</option>
          <option value="gallery">Photo gallery</option>
        </select>
      </div>
      {state.error ? <p className="text-destructive text-sm">{state.error}</p> : null}
      {state.ok ? <p className="text-green text-sm">{state.ok}</p> : null}
      <Button type="submit" disabled={pending} className="h-10 px-4">
        {pending ? "Uploading…" : "Upload"}
      </Button>
    </form>
  );
}

export function DeleteImageButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState<ImageState, FormData>(deleteSiteImageAction, {});
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="outline" disabled={pending} className="h-9 px-3">
        Remove
      </Button>
      {state.error ? <p className="text-destructive mt-1 text-xs">{state.error}</p> : null}
    </form>
  );
}
