"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteLessonAction,
  upsertLessonAction,
  type AdminState,
} from "@/lib/admin/actions";

type Lesson = {
  id: string;
  courseSlug: string;
  moduleTitle: string;
  title: string;
  description: string;
  videoUrl: string;
  durationMin: number;
  sortOrder: number;
  published: boolean;
};

export function LessonEditor({
  courses,
  lesson,
}: {
  courses: { slug: string; title: string }[];
  lesson?: Lesson;
}) {
  const [state, action, pending] = useActionState<AdminState, FormData>(
    upsertLessonAction,
    {}
  );
  return (
    <form action={action} className="space-y-3 rounded-xl border border-border bg-white p-5">
      <h2 className="font-heading text-lg font-semibold text-navy">
        {lesson ? "Edit lesson" : "Add video lesson"}
      </h2>
      {lesson ? <input type="hidden" name="id" value={lesson.id} /> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor={`courseSlug-${lesson?.id ?? "new"}`}>Course</Label>
          <select
            id={`courseSlug-${lesson?.id ?? "new"}`}
            name="courseSlug"
            required
            defaultValue={lesson?.courseSlug ?? ""}
            className="border-input h-10 w-full rounded-md border bg-white px-3 text-sm"
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
        <div className="space-y-1.5">
          <Label htmlFor={`moduleTitle-${lesson?.id ?? "new"}`}>Module</Label>
          <Input
            id={`moduleTitle-${lesson?.id ?? "new"}`}
            name="moduleTitle"
            required
            defaultValue={lesson?.moduleTitle}
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`title-${lesson?.id ?? "new"}`}>Lesson title</Label>
          <Input
            id={`title-${lesson?.id ?? "new"}`}
            name="title"
            required
            defaultValue={lesson?.title}
            className="h-10"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor={`videoUrl-${lesson?.id ?? "new"}`}>Video URL</Label>
          <Input
            id={`videoUrl-${lesson?.id ?? "new"}`}
            name="videoUrl"
            required
            defaultValue={lesson?.videoUrl}
            placeholder="https://www.youtube.com/watch?v=…"
            className="h-10"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor={`description-${lesson?.id ?? "new"}`}>Description</Label>
          <Textarea
            id={`description-${lesson?.id ?? "new"}`}
            name="description"
            defaultValue={lesson?.description}
            rows={3}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`durationMin-${lesson?.id ?? "new"}`}>Duration (min)</Label>
          <Input
            id={`durationMin-${lesson?.id ?? "new"}`}
            name="durationMin"
            type="number"
            min={1}
            defaultValue={lesson?.durationMin ?? 10}
            className="h-10"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`sortOrder-${lesson?.id ?? "new"}`}>Sort order</Label>
          <Input
            id={`sortOrder-${lesson?.id ?? "new"}`}
            name="sortOrder"
            type="number"
            defaultValue={lesson?.sortOrder ?? 0}
            className="h-10"
          />
        </div>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={lesson?.published ?? true}
            className="size-4"
          />
          Published for enrolled students
        </label>
      </div>
      {state.error ? <p className="text-destructive text-sm">{state.error}</p> : null}
      {state.ok ? <p className="text-green text-sm">{state.ok}</p> : null}
      <Button type="submit" disabled={pending} className="h-10 px-4">
        {pending ? "Saving…" : lesson ? "Update lesson" : "Create lesson"}
      </Button>
    </form>
  );
}

export function DeleteLessonButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState<AdminState, FormData>(
    deleteLessonAction,
    {}
  );
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="outline" disabled={pending} className="h-9 px-3">
        Delete
      </Button>
      {state.error ? <span className="text-destructive ml-2 text-xs">{state.error}</span> : null}
    </form>
  );
}
