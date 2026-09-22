"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { markLessonCompleteAction, type LearnState } from "@/lib/learning/actions";

export function MarkCompleteButton({
  lessonId,
  courseSlug,
  completed,
}: {
  lessonId: string;
  courseSlug: string;
  completed: boolean;
}) {
  const [state, action, pending] = useActionState<LearnState, FormData>(
    markLessonCompleteAction,
    {}
  );

  if (completed || state.ok) {
    return (
      <p className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-green">
        Lesson completed
      </p>
    );
  }

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="courseSlug" value={courseSlug} />
      {state.error ? <p className="text-destructive text-sm">{state.error}</p> : null}
      <Button type="submit" disabled={pending} className="h-11 px-5">
        {pending ? "Saving…" : "Mark as complete"}
      </Button>
    </form>
  );
}
