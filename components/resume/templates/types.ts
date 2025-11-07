import { CVData, Experience } from "@/types/cv";

export type TemplateProps = {
  data: CVData;
  activeExperienceId: string | null;
  onExperienceFieldChange: (id: string, patch: Partial<Experience>) => void;
  onExperienceBulletChange: (id: string, index: number, value: string) => void;
};
