"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { findMyCourseOptions } from "@/data/recommendation-rules";
import { recommendByCareerGoal } from "@/lib/recommendations";
import type { Recommendation } from "@/types/enquiry";

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-white px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function FindMyCourseForm() {
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const careerGoal = String(form.get("careerGoal") ?? "");
    if (!careerGoal) {
      setError("Choose a career goal so we can match a programme.");
      return;
    }
    const result = recommendByCareerGoal(careerGoal);
    if (result.length === 0) {
      setError("No match for that combination. Try another career goal.");
      return;
    }
    setRecommendations(result);
  }

  if (recommendations) {
    return (
      <div className="space-y-4 rounded-xl border border-border bg-white p-6" role="status">
        <h3 className="font-heading text-xl">Suggested programmes</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Matched in your browser with published rules — not an AI engine.
          Enrolment, booking and a counsellor follow-up are coming soon.
        </p>
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
        <Button
          type="button"
          variant="outline"
          className="h-11"
          onClick={() => setRecommendations(null)}
        >
          Try another match
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-border bg-white p-5 sm:p-6">
      <SelectField label="Education" name="education" options={findMyCourseOptions.education} />
      <SelectField label="Occupation" name="occupation" options={findMyCourseOptions.occupation} />
      <SelectField label="Age group" name="ageGroup" options={findMyCourseOptions.ageGroup} />
      <SelectField
        label="Career goal"
        name="careerGoal"
        options={findMyCourseOptions.careerGoal}
      />
      <SelectField label="Area of interest" name="interest" options={findMyCourseOptions.interest} />
      <SelectField label="Current skill level" name="skillLevel" options={findMyCourseOptions.skillLevel} />
      <SelectField label="Preferred format" name="learningFormat" options={findMyCourseOptions.learningFormat} />
      <SelectField label="Budget" name="budget" options={findMyCourseOptions.budget} />
      {error ? (
        <p className="text-destructive text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="h-11 px-5">
        Get a suggested programme
      </Button>
    </form>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[] | readonly { value: string; label: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>
        {label}
        <span className="text-destructive"> *</span>
      </Label>
      <select id={name} name={name} required className={selectClass} defaultValue="">
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
    </div>
  );
}
