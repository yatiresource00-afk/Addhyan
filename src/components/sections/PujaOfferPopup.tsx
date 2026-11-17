"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "addhyan-franchise-offer-seen";

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
        className="absolute inset-0 bg-[#001850]/50 backdrop-blur-xs"
        aria-label="Close offer"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="franchise-offer-title"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-[0_16px_40px_rgba(0,24,80,0.18)]"
      >
        {/* Background image with fading gradient mask */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)"
          }}
        >
          <img
            src="/brand/franchise.jpeg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          <p className="text-orange text-xs font-semibold tracking-wide uppercase">Franchise Opportunity</p>
          <h2 id="franchise-offer-title" className="font-heading mt-2 text-2xl font-semibold text-navy">
            Partner with Addhyan Academy
          </h2>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            Expand your business or start your educational venture with our proven franchise model. Get full curriculum, technical, and marketing support.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Link href="/franchise" onClick={close} className="inline-flex">
              <Button className="h-11 w-full px-5">Explore Franchise</Button>
            </Link>
            <Link href="/contact" onClick={close} className="inline-flex">
              <Button variant="outline" className="h-11 w-full px-5">
                Contact Team
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
    </div>
  );
}


