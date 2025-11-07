import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-400 selection:bg-[var(--accent,#1F3A5F)]/10 selection:text-slate-900 h-11 w-full min-w-0 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition-all outline-none file:inline-flex file:h-8 file:rounded-lg file:border-0 file:bg-white file:px-3 file:text-xs file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md",
        "focus-visible:border-[var(--accent,#1F3A5F)] focus-visible:ring-2 focus-visible:ring-[var(--accent,#1F3A5F)] focus-visible:ring-offset-0",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
