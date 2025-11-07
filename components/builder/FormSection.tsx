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
    <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm shadow-slate-900/5">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="resume-heading text-lg font-semibold text-slate-900">
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </header>
      <Separator className="mb-6 bg-slate-200" />
      <div className="space-y-4">{children}</div>
    </section>
  );
};
