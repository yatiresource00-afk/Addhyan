"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button-variants";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Logo priority />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.primary.map((item) =>
            "hasMenu" in item && item.hasMenu ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setCoursesOpen(true)}
                onMouseLeave={() => setCoursesOpen(false)}
              >
                <button
                  type="button"
                  className="text-foreground hover:text-navy inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  aria-expanded={coursesOpen}
                  aria-haspopup="true"
                  onClick={() => setCoursesOpen((value) => !value)}
                >
                  {item.label}
                  <ChevronDown className="size-4" aria-hidden />
                </button>
                {coursesOpen ? (
                  <div className="absolute top-full left-0 z-50 w-[22rem] rounded-xl border border-border bg-white p-4 shadow-[0_8px_24px_rgba(0,24,80,0.08)]">
                    <div className="grid gap-4">
                      {nav.coursesMenu.map((group) => (
                        <div key={group.heading}>
                          <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
                            {group.heading}
                          </p>
                          <ul className="space-y-1">
                            {group.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="hover:bg-secondary hover:text-navy block rounded-md px-2 py-1.5 text-sm"
                                  onClick={() => setCoursesOpen(false)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-navy rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="hidden lg:block">
          <Link
            href="/find-my-course"
            className={cn(buttonVariants({ size: "lg" }), "h-10 px-4")}
          >
            Find my course
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </Container>
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-white lg:hidden"
        >
          <Container className="space-y-4 py-4">
            {nav.primary
              .filter((item) => !("hasMenu" in item && item.hasMenu))
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-1 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            {nav.coursesMenu.map((group) => (
              <div key={group.heading}>
                <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
                  {group.heading}
                </p>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-1 text-sm"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/find-my-course"
              className={cn(buttonVariants({ size: "lg" }), "h-11 w-full")}
              onClick={() => setOpen(false)}
            >
              Find my course
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
