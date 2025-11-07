"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FormSection } from "@/components/builder/FormSection";
import { useCv } from "@/providers/cv-provider";

export const SkillsLanguagesForm = () => {
  const {
    state: {
      data: { profile },
    },
    updateProfile,
  } = useCv();

  const appendSkillKeyword = (keyword: string) => {
    const existing = profile.skills ?? "";
    const separator = existing.trim().endsWith(";") || existing.trim() === "" ? "" : "; ";
    const next = `${existing}${separator}${keyword}`.replace(/\s+;/g, ";");
    updateProfile({ skills: next.trim() });
  };

  return (
    <FormSection
      title="Habilidades e idiomas"
      description="Describe tus grupos de habilidades agrupados por categorías y añade idiomas con nivel."
      actions={
        <Button
          type="button"
          variant="outline"
          onClick={() => appendSkillKeyword("Frontend: React, Next.js, TypeScript")}
        >
          Insertar ejemplo
        </Button>
      }
    >
      <div className="space-y-2">
        <Label htmlFor="profile-skills">Habilidades agrupadas</Label>
        <Textarea
          id="profile-skills"
          value={profile.skills ?? ""}
          onChange={(event) => updateProfile({ skills: event.target.value })}
          placeholder="Frontend: React, Next.js, TypeScript; Backend: Node.js, GraphQL; Tooling: Jest, Playwright"
          rows={3}
        />
        <p className="text-xs text-slate-500">
          Separa grupos con punto y coma (;). Dentro de cada grupo usa el patrón &quot;Grupo: item, item&quot; para facilitar el parsing y el ATS.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-languages">Idiomas</Label>
        <Input
          id="profile-languages"
          value={profile.languages ?? ""}
          onChange={(event) => updateProfile({ languages: event.target.value })}
          placeholder="Español — nativo | Inglés — C1"
        />
      </div>
    </FormSection>
  );
};
