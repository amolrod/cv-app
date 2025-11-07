"use client";

import { CSSProperties, ComponentType, useCallback, useMemo } from "react";

import { useCv } from "@/providers/cv-provider";
import { BestPracticeTemplate } from "@/components/resume/templates/BestPractice";
import { ClassicTemplate } from "@/components/resume/templates/Classic";
import { SimpleTemplate } from "@/components/resume/templates/Simple";
import { VisualTwoColTemplate } from "@/components/resume/templates/VisualTwoCol";
import { TemplateProps } from "@/components/resume/templates/types";
import { Experience } from "@/types/cv";

const templateMap: Record<string, ComponentType<TemplateProps>> = {
  best: BestPracticeTemplate,
  classic: ClassicTemplate,
  simple: SimpleTemplate,
  visual2col: VisualTwoColTemplate,
};

type ResumePageProps = {
  activeExperienceId: string | null;
};

export const ResumePage = ({ activeExperienceId }: ResumePageProps) => {
  const {
    state: { data, ui },
    updateExperience,
  } = useCv();

  const Template = templateMap[ui.template] ?? BestPracticeTemplate;

  const style = useMemo(() => {
    return {
      "--resume-accent": ui.accent,
      "--resume-base-size": `${ui.baseSizePt}pt`,
    } as CSSProperties;
  }, [ui.accent, ui.baseSizePt]);

  const className = useMemo(() => {
    const base = ["resume-page", `font-preset-${ui.fontPreset}`];
    if (ui.compact) base.push("resume-compact");
    return base.join(" ");
  }, [ui.fontPreset, ui.compact]);

  const handleExperienceFieldChange = useCallback(
    (id: string, patch: Partial<Experience>) => {
      updateExperience(id, patch);
    },
    [updateExperience]
  );

  const handleExperienceBulletChange = useCallback(
    (id: string, index: number, value: string) => {
      const target = data.experience.find((item) => item.id === id);
      if (!target) return;
      const next = [...target.bullets];
      next[index] = value;
      updateExperience(id, { bullets: next });
    },
    [data.experience, updateExperience]
  );

  return (
    <div className="group relative overflow-hidden rounded-[32px] border-4 border-white bg-white shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/50 transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]">
      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 bg-gradient-to-bl from-[var(--accent)]/5 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-blue-500/5 to-transparent" />
      
      <div className={className} style={style}>
        <Template
          data={data}
          activeExperienceId={activeExperienceId}
          onExperienceFieldChange={handleExperienceFieldChange}
          onExperienceBulletChange={handleExperienceBulletChange}
        />
      </div>
    </div>
  );
};
