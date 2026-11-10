"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { cn } from "cn";

/**
 * Fades and lifts its children into view once, using an IntersectionObserver
 * plus a CSS transition instead of a motion library — the effect is identical
 * and it keeps ~30 KB of JavaScript off the critical path.
 *
 * The hidden state lives in CSS, so the `<noscript>` rule in the layout and the
 * reduced-motion block in `globals.css` remain load-bearing: decoration must
 * never gate content. The reveal flips a DOM attribute rather than React state
 * so a page full of sections never re-renders for an animation.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      node.dataset.visible = "";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.dataset.visible = "";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}
