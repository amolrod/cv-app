"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/builder/FormSection";
import { useCv } from "@/providers/cv-provider";
import { Education } from "@/types/cv";

export const EducationFormList = () => {
  const {
    state: {
      data: { education },
    },
    addEducation,
    updateEducation,
    removeEducation,
    moveEducation,
  } = useCv();

  const handleField = <K extends keyof Education>(
    item: Education,
    field: K,
    value: Education[K]
  ) => {
    updateEducation(item.id, { [field]: value } as Partial<Education>);
  };

  return (
    <FormSection
      title="Educación"
      description="Incluye solo formación relevante y certificaciones destacadas."
      actions={
        <Button type="button" onClick={addEducation}>
          <Plus className="mr-2 h-4 w-4" /> Añadir formación
        </Button>
      }
    >
      <div className="space-y-6">
        {education.map((item, index) => (
          <article
            key={item.id}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4"
          >
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-500">
                Estudio #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === 0}
                  onClick={() => moveEducation(item.id, "up")}
                  aria-label="Mover formación arriba"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === education.length - 1}
                  onClick={() => moveEducation(item.id, "down")}
                  aria-label="Mover formación abajo"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeEducation(item.id)}
                  aria-label="Eliminar formación"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`edu-school-${item.id}`}>Centro</Label>
                <Input
                  id={`edu-school-${item.id}`}
                  value={item.school}
                  onChange={(event) =>
                    handleField(item, "school", event.target.value)
                  }
                  placeholder="Universidad / Centro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-degree-${item.id}`}>Título</Label>
                <Input
                  id={`edu-degree-${item.id}`}
                  value={item.degree}
                  onChange={(event) =>
                    handleField(item, "degree", event.target.value)
                  }
                  placeholder="Ej. Grado en Ingeniería Informática"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-start-${item.id}`}>Inicio</Label>
                <Input
                  id={`edu-start-${item.id}`}
                  value={item.start}
                  onChange={(event) =>
                    handleField(item, "start", event.target.value)
                  }
                  placeholder="2011"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`edu-end-${item.id}`}>Fin</Label>
                <Input
                  id={`edu-end-${item.id}`}
                  value={item.end}
                  onChange={(event) =>
                    handleField(item, "end", event.target.value)
                  }
                  placeholder="2015"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor={`edu-details-${item.id}`}>Detalles</Label>
              <Textarea
                id={`edu-details-${item.id}`}
                value={item.details ?? ""}
                onChange={(event) =>
                  handleField(item, "details", event.target.value)
                }
                placeholder="Notas, tesis, especialización o reconocimientos."
                rows={3}
              />
            </div>
          </article>
        ))}
        {education.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
            Añade tus estudios o certificaciones para completar el perfil.
          </p>
        ) : null}
      </div>
    </FormSection>
  );
};
