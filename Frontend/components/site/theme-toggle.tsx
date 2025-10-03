"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current = resolvedTheme || (theme === "system" ? systemTheme : theme) || "light"
  const isDark = current === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) {
    // Prevent hydration mismatch
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-foreground/80 transition-all duration-300 hover:shadow-md hover:border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {/* Placeholder circle */}
        <span className="block h-4 w-4 rounded-full bg-foreground/30" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-background/70 text-foreground/80 transition-all duration-300 hover:shadow-md hover:border-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:h-10 md:w-10"
    >
      {/* Sun / Moon icon drawn in pure Tailwind for zero deps */}
      <span
        aria-hidden="true"
        className={[
          "relative block h-5 w-5 transition-transform duration-300",
          isDark ? "rotate-180" : "rotate-0",
        ].join(" ")}
      >
        {/* Sun (light) */}
        <svg
          className={["absolute inset-0 h-5 w-5", isDark ? "opacity-0" : "opacity-100"].join(" ")}
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="4.5" className="fill-current" />
          <g className="stroke-current" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
          </g>
        </svg>
        {/* Moon (dark) */}
        <svg
          className={["absolute inset-0 h-5 w-5", isDark ? "opacity-100" : "opacity-0"].join(" ")}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path className="fill-current" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
