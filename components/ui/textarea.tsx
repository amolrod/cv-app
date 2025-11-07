import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-slate-400 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-24 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md",
        "focus-visible:border-[var(--accent,#1F3A5F)] focus-visible:ring-2 focus-visible:ring-[var(--accent,#1F3A5F)] focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
