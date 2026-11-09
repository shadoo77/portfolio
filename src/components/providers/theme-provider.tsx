"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      // next-themes renders its no-flash <script> inside this client component.
      // React 19 warns about executable <script> tags rendered on the client,
      // so we mark that copy as a non-executable data block. The real theme
      // script is rendered once in the layout <head>, before hydration.
      // See https://github.com/pacocoursey/next-themes/issues/387
      scriptProps={{ type: "application/json" }}
    >
      {children}
    </NextThemesProvider>
  );
}
