"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gradient-to-r data-[state=on]:from-[var(--accent)] data-[state=on]:to-[var(--accent-dark)] data-[state=on]:text-white data-[state=on]:shadow-lg data-[state=on]:shadow-[var(--accent)]/30 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default: "border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 hover:shadow-md",
        outline:
          "border-2 border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:shadow-md",
      },
      size: {
        default: "h-11 px-4 min-w-11",
        sm: "h-9 px-3 min-w-9",
        lg: "h-12 px-5 min-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
