"use client";

import { useState, type ReactNode } from "react";
import {
  useEventCallback,
  useEventListener,
  useIsomorphicLayoutEffect,
} from "usehooks-ts";

const SCROLL_THRESHOLD = 16;

export function ScrollHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  const sync = useEventCallback(() => {
    const next = window.scrollY > SCROLL_THRESHOLD;
    setScrolled((previous) => (previous === next ? previous : next));
  });

  // Apply the initial state before paint so a reload mid-page doesn't flash.
  useIsomorphicLayoutEffect(() => sync(), [sync]);

  useEventListener("scroll", sync, undefined, { passive: true });

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className="group border-border/60 bg-background/80 data-[scrolled=true]:bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:shadow-sm data-[scrolled=true]:backdrop-blur-xl motion-reduce:transition-none"
    >
      {children}
    </header>
  );
}
