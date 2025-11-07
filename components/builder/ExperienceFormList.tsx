"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/builder/FormSection";
import { BulletAssistantModal } from "@/components/builder/BulletAssistantModal";
import { useCv } from "@/providers/cv-provider";
import { useInlineExperience } from "@/providers/inline-experience-provider";
import { Experience } from "@/types/cv";

const blankBullet = "Describe un impacto medible...";

type AssistantTarget = {
  experienceId: string;
};

export type ExperienceFormHandle = {
  openAssistant: (experienceId?: string) => void;
};

export const ExperienceFormList = forwardRef<ExperienceFormHandle>((_, ref) => {
  const {
    state: {
      data: { experience },
    },
    addExperience,
    updateExperience,
    moveExperience,
    removeExperience,
  } = useCv();
  const { setActiveExperienceId } = useInlineExperience();
  const [assistant, setAssistant] = useState<AssistantTarget | null>(null);

  useImperativeHandle(ref, () => ({
    openAssistant: (experienceId?: string) => {
      if (experienceId) {
        setAssistant({ experienceId });
        return;
      }
      if (experience[0]) {
        setAssistant({ experienceId: experience[0].id });
      }
    },
  }));

  const handleAddExperience = () => {
    const newId = addExperience();
    setActiveExperienceId(newId);
  };

  const handleField = <K extends keyof Experience>(
    item: Experience,
    field: K,
    value: Experience[K]
  ) => {
    updateExperience(item.id, { [field]: value } as Partial<Experience>);
  };

  const handleBulletChange = (
    item: Experience,
    index: number,
    value: string
  ) => {
    const next = [...item.bullets];
    next[index] = value;
    updateExperience(item.id, { bullets: next });
  };

  const addBullet = (item: Experience) => {
    updateExperience(item.id, { bullets: [...item.bullets, ""] });
  };

  const removeBullet = (item: Experience, index: number) => {
    const next = item.bullets.filter((_, idx) => idx !== index);
    updateExperience(item.id, { bullets: next.length ? next : [""] });
  };

  const insertAssistantBullet = (bullet: string) => {
    if (!assistant) return;
    const item = experience.find((exp) => exp.id === assistant.experienceId);
    if (!item) return;
    updateExperience(item.id, { bullets: [...item.bullets, bullet] });
    setAssistant(null);
  };

  return (
    <FormSection
      title="Experiencia profesional"
      description="Añade logros medibles y responsabilidades clave ordenadas por relevancia."
      actions={
        <Button type="button" onClick={handleAddExperience}>
          <Plus className="mr-2 h-4 w-4" /> Añadir experiencia
        </Button>
      }
    >
      <div className="space-y-6">
        {experience.map((item, index) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-3xl border-2 border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 p-6 shadow-lg transition-all hover:border-slate-300 hover:shadow-xl"
          >
            {/* Subtle decorative gradient */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[var(--accent)]/5 to-blue-500/5 blur-2xl transition-all group-hover:scale-110" />
            
            <header className="relative mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-gradient-to-r from-[var(--accent)]/10 to-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                Puesto #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  disabled={index === 0}
                  onClick={() => moveExperience(item.id, "up")}
                  aria-label="Mover experiencia arriba"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  disabled={index === experience.length - 1}
                  onClick={() => moveExperience(item.id, "down")}
                  aria-label="Mover experiencia abajo"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeExperience(item.id)}
                  aria-label="Eliminar experiencia"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`exp-company-${item.id}`}>Empresa</Label>
                <Input
                  id={`exp-company-${item.id}`}
                  value={item.company}
                  onChange={(event) =>
                    handleField(item, "company", event.target.value)
                  }
                  placeholder="Ej. TechNova"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exp-role-${item.id}`}>Puesto</Label>
                <Input
                  id={`exp-role-${item.id}`}
                  value={item.role}
                  onChange={(event) =>
                    handleField(item, "role", event.target.value)
                  }
                  placeholder="Ej. Lead Frontend Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exp-start-${item.id}`}>Inicio</Label>
                <Input
                  id={`exp-start-${item.id}`}
                  value={item.start}
                  onChange={(event) =>
                    handleField(item, "start", event.target.value)
                  }
                  placeholder="2021"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`exp-end-${item.id}`}>
                  Fin {" "}
                  <span className="text-xs font-normal text-slate-500">
                    (deja vacío si sigue vigente)
                  </span>
                </Label>
                <Input
                  id={`exp-end-${item.id}`}
                  value={item.current ? "Actualidad" : item.end}
                  onChange={(event) =>
                    handleField(item, "end", event.target.value)
                  }
                  disabled={item.current}
                  placeholder="2023"
                />
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={item.current}
                    onChange={(event) =>
                      updateExperience(item.id, {
                        current: event.target.checked,
                        end: event.target.checked ? "" : item.end,
                      })
                    }
                  />
                  Actualmente en el puesto
                </label>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm font-semibold text-slate-600">
                  Logros
                </Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => addBullet(item)}
                  >
                    <Plus className="mr-1 h-4 w-4" /> Añadir bullet
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setAssistant({ experienceId: item.id })}
                  >
                    <Sparkles className="mr-1 h-4 w-4" /> Asistente de logros
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {item.bullets.map((bullet, bulletIndex) => (
                  <div key={`${item.id}-bullet-${bulletIndex}`} className="flex gap-2">
                    <Textarea
                      value={bullet}
                      onChange={(event) =>
                        handleBulletChange(item, bulletIndex, event.target.value)
                      }
                      placeholder={blankBullet}
                      rows={2}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => removeBullet(item, bulletIndex)}
                      aria-label="Eliminar bullet"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
        {experience.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            Añade tu primera experiencia para comenzar a construir el CV.
          </p>
        ) : null}
      </div>

      <BulletAssistantModal
        open={assistant !== null}
        onOpenChange={(next) => {
          if (!next) {
            setAssistant(null);
          }
        }}
        onGenerate={insertAssistantBullet}
      />
    </FormSection>
  );
});

ExperienceFormList.displayName = "ExperienceFormList";
