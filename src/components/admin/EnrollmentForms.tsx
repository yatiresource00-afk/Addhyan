"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  enrollStudentAction,
  revokeEnrollmentAction,
  type AdminState,
} from "@/lib/admin/actions";

export function EnrollForm({
  students,
  courses,
}: {
  students: { id: string; name: string; email: string }[];
  courses: { slug: string; title: string }[];
}) {
  const [state, action, pending] = useActionState<AdminState, FormData>(
    enrollStudentAction,
    {}
  );
  return (
    <form action={action} className="space-y-3 rounded-xl border border-border bg-white p-5">
      <h2 className="font-heading text-lg font-semibold text-navy">Enrol a student</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <select
          name="userId"
          required
          className="border-input h-10 rounded-md border bg-white px-3 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select student
          </option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.email})
            </option>
          ))}
        </select>
        <select
          name="courseSlug"
          required
          className="border-input h-10 rounded-md border bg-white px-3 text-sm"
          defaultValue=""
        >
          <option value="" disabled>
            Select course
          </option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </div>
      {state.error ? <p className="text-destructive text-sm">{state.error}</p> : null}
      {state.ok ? <p className="text-green text-sm">{state.ok}</p> : null}
      <Button type="submit" disabled={pending} className="h-10 px-4">
        {pending ? "Saving…" : "Enrol"}
      </Button>
    </form>
  );
}

export function RevokeEnrollmentButton({ enrollmentId }: { enrollmentId: string }) {
  const [state, action, pending] = useActionState<AdminState, FormData>(
    revokeEnrollmentAction,
    {}
  );
  return (
    <form action={action}>
      <input type="hidden" name="enrollmentId" value={enrollmentId} />
      <Button type="submit" variant="outline" disabled={pending} className="h-9 px-3">
        Remove
      </Button>
      {state.error ? <span className="text-destructive ml-2 text-xs">{state.error}</span> : null}
    </form>
  );
}
