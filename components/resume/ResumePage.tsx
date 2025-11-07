"use client";

import { CSSProperties, ComponentType, useMemo } from "react";

import { useCv } from "@/providers/cv-provider";
import { BestPracticeTemplate } from "@/components/resume/templates/BestPractice";
import { ClassicTemplate } from "@/components/resume/templates/Classic";
import { SimpleTemplate } from "@/components/resume/templates/Simple";
import { VisualTwoColTemplate } from "@/components/resume/templates/VisualTwoCol";
import { TemplateProps } from "@/components/resume/templates/types";

const templateMap: Record<string, ComponentType<TemplateProps>> = {
  best: BestPracticeTemplate,
  classic: ClassicTemplate,
  simple: SimpleTemplate,
  visual2col: VisualTwoColTemplate,
};

export const ResumePage = () => {
  const {
    state: { data, ui },
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

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
      <div className={className} style={style}>
        <Template data={data} />
      </div>
    </div>
  );
};
