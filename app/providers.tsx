"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/contexts/animation-context";
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AnimationProvider>
        <ScrollProgressIndicator />
        {children}
      </AnimationProvider>
    </ThemeProvider>
  );
}

export default Providers;
