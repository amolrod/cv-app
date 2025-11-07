type SectionTitleProps = {
  label: string;
};

export const SectionTitle = ({ label }: SectionTitleProps) => (
  <div className="flex items-center gap-3">
    <span
      className="h-5 w-1.5 rounded-full"
      style={{ backgroundColor: "var(--resume-accent)" }}
      aria-hidden="true"
    />
    <h3 className="resume-heading text-[1.05em] font-semibold uppercase tracking-[0.18em] text-slate-700">
      {label}
    </h3>
  </div>
);
