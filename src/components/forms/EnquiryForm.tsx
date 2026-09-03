"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { findMyCourseOptions } from "@/data/recommendation-rules";
import type { EnquiryType, Recommendation } from "@/types/enquiry";

type FieldErrors = Record<string, string>;

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function EnquiryForm({
  type,
  courseSlug,
  submitLabel,
}: {
  type: EnquiryType;
  courseSlug?: string;
  submitLabel: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type, courseSlug }),
      });
      const data = (await response.json()) as {
        error?: string;
        fieldErrors?: FieldErrors;
        recommendations?: Recommendation[];
      };
      if (!response.ok) {
        setErrors(data.fieldErrors ?? {});
        setMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setRecommendations(data.recommendations ?? []);
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-white p-6" role="status">
        <h3 className="font-heading text-xl">Enquiry received</h3>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          Thank you. Addhyan Academy will follow up using the contact details you shared.
          Online enrolment is not live yet — this enquiry is the current next step.
        </p>
        {recommendations.length > 0 ? (
          <div className="mt-5 space-y-3">
            <p className="text-sm font-medium">Suggested programmes (rule-based, not an AI engine):</p>
            <ul className="space-y-2">
              {recommendations.map((item) => (
                <li key={item.slug} className="rounded-lg border border-border p-3">
                  <Link href={item.href} className="text-primary font-medium">
                    {item.primary ? "Recommended: " : "Also consider: "}
                    {item.title}
                  </Link>
                  <p className="text-muted-foreground mt-1 text-sm">{item.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Field label="Full name" name="name" error={errors.name} required>
        <Input id="name" name="name" autoComplete="name" required className="h-11" aria-invalid={!!errors.name} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" error={errors.phone} required>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required className="h-11" aria-invalid={!!errors.phone} />
        </Field>
        <Field label="Email" name="email" error={errors.email} required>
          <Input id="email" name="email" type="email" autoComplete="email" required className="h-11" aria-invalid={!!errors.email} />
        </Field>
      </div>

      {type === "corporate" ? (
        <Field label="Organisation" name="company" error={errors.company} required>
          <Input id="company" name="company" required className="h-11" />
        </Field>
      ) : null}

      {type === "franchise" ? (
        <Field label="City" name="city" error={errors.city}>
          <Input id="city" name="city" className="h-11" />
        </Field>
      ) : null}

      {type === "find-my-course" ? <FindMyCourseFields errors={errors} /> : null}

      {type !== "find-my-course" ? (
        <Field
          label={type === "course-interest" ? "Anything we should know?" : "Message"}
          name="message"
          error={errors.message}
        >
          <Textarea id="message" name="message" rows={4} />
        </Field>
      ) : (
        <Field label="Specific requirement" name="requirement" error={errors.requirement}>
          <Textarea id="requirement" name="requirement" rows={4} />
        </Field>
      )}

      {status === "error" && message ? (
        <p className="text-destructive text-sm" role="alert">
          {message}
        </p>
      ) : null}

      <Button type="submit" disabled={status === "loading"} className="h-11 px-5">
        {status === "loading" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}

function FindMyCourseFields({ errors }: { errors: FieldErrors }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Education" name="education" error={errors.education} options={findMyCourseOptions.education} />
        <SelectField label="Occupation" name="occupation" error={errors.occupation} options={findMyCourseOptions.occupation} />
        <SelectField label="Age group" name="ageGroup" error={errors.ageGroup} options={findMyCourseOptions.ageGroup} />
        <SelectField
          label="Career goal"
          name="careerGoal"
          error={errors.careerGoal}
          options={findMyCourseOptions.careerGoal}
        />
        <SelectField label="Area of interest" name="interest" error={errors.interest} options={findMyCourseOptions.interest} />
        <SelectField label="Current skill level" name="skillLevel" error={errors.skillLevel} options={findMyCourseOptions.skillLevel} />
        <SelectField label="Preferred format" name="learningFormat" error={errors.learningFormat} options={findMyCourseOptions.learningFormat} />
        <SelectField label="Budget" name="budget" error={errors.budget} options={findMyCourseOptions.budget} />
      </div>
    </>
  );
}

function SelectField({
  label,
  name,
  error,
  options,
}: {
  label: string;
  name: string;
  error?: string;
  options: readonly string[] | readonly { value: string; label: string }[];
}) {
  return (
    <Field label={label} name={name} error={error} required>
      <select id={name} name={name} required className={selectClass} defaultValue="" aria-invalid={!!error}>
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value;
          const text = typeof option === "string" ? option : option.label;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </Field>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
