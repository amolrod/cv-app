import { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";

type FormSectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export const FormSection = ({
  title,
  description,
  actions,
  children,
}: FormSectionProps) => {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-white via-white to-slate-50/30 p-6 shadow-lg backdrop-blur-sm transition-all hover:shadow-xl md:p-8">
      {/* Decorative gradient accent */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[var(--accent)]/5 to-blue-500/5 blur-3xl transition-all group-hover:scale-110" />
      
      <header className="relative mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="resume-heading text-xl font-bold text-slate-900">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      <Separator className="mb-7 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200" />
      <div className="relative space-y-4 md:space-y-5">{children}</div>
    </section>
  );
};
