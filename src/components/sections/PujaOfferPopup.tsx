"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "addhyan-puja-offer-seen";

export function PujaOfferPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/learn")) return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  function close() {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-[#001850]/50"
        aria-label="Close offer"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="puja-offer-title"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(0,24,80,0.18)]"
      >
        <p className="text-orange text-xs font-semibold tracking-wide uppercase">Puja Offer</p>
        <h2 id="puja-offer-title" className="font-heading mt-2 text-2xl font-semibold text-navy">
          Free demo class and live counselling
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          Join a free demo class and a live counselling session during the Puja offer. Create a student account to get started.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link href="/register" onClick={close} className="inline-flex">
            <Button className="h-11 w-full px-5">Create student account</Button>
          </Link>
          <Link href="/career-counselling" onClick={close} className="inline-flex">
            <Button variant="outline" className="h-11 w-full px-5">
              Live counselling
            </Button>
          </Link>
        </div>
        <button
          type="button"
          onClick={close}
          className="text-muted-foreground mt-4 text-sm underline-offset-2 hover:underline"
        >
          Not now
        </button>
      </div>
    </div>
  );
}
