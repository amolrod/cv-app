"use client";

import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormSection } from "@/components/builder/FormSection";
import { useCv } from "@/providers/cv-provider";
import { Project } from "@/types/cv";

export const ProjectsFormList = () => {
  const {
    state: {
      data: { projects },
    },
    addProject,
    updateProject,
    removeProject,
    moveProject,
  } = useCv();

  const handleField = <K extends keyof Project>(
    project: Project,
    field: K,
    value: Project[K]
  ) => {
    updateProject(project.id, { [field]: value } as Partial<Project>);
  };

  return (
    <FormSection
      title="Proyectos destacados"
      description="Muestra iniciativas relevantes, productos personales o contribuciones notables."
      actions={
        <Button type="button" onClick={addProject}>
          <Plus className="mr-2 h-4 w-4" /> Añadir proyecto
        </Button>
      }
    >
      <div className="space-y-6">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4"
          >
            <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-500">
                Proyecto #{index + 1}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === 0}
                  onClick={() => moveProject(project.id, "up")}
                  aria-label="Mover proyecto arriba"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === projects.length - 1}
                  onClick={() => moveProject(project.id, "down")}
                  aria-label="Mover proyecto abajo"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeProject(project.id)}
                  aria-label="Eliminar proyecto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`proj-name-${project.id}`}>Nombre</Label>
                <Input
                  id={`proj-name-${project.id}`}
                  value={project.name}
                  onChange={(event) =>
                    handleField(project, "name", event.target.value)
                  }
                  placeholder="Ej. Analizador de ofertas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`proj-role-${project.id}`}>Rol</Label>
                <Input
                  id={`proj-role-${project.id}`}
                  value={project.role ?? ""}
                  onChange={(event) =>
                    handleField(project, "role", event.target.value)
                  }
                  placeholder="Ej. Frontend Lead"
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor={`proj-description-${project.id}`}>Descripción</Label>
              <Textarea
                id={`proj-description-${project.id}`}
                value={project.description}
                onChange={(event) =>
                  handleField(project, "description", event.target.value)
                }
                placeholder="Explica el objetivo del proyecto, el problema resuelto y tu aporte."
                rows={3}
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`proj-technologies-${project.id}`}>
                  Tecnologías
                </Label>
                <Input
                  id={`proj-technologies-${project.id}`}
                  value={project.technologies ?? ""}
                  onChange={(event) =>
                    handleField(project, "technologies", event.target.value)
                  }
                  placeholder="Next.js, Tailwind CSS, Playwright"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`proj-link-${project.id}`}>Link</Label>
                <div className="flex gap-2">
                  <Input
                    id={`proj-link-${project.id}`}
                    value={project.link ?? ""}
                    onChange={(event) =>
                      handleField(project, "link", event.target.value)
                    }
                    placeholder="https://"
                    inputMode="url"
                  />
                  {project.link ? (
                    <Button asChild variant="outline" size="icon">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
        {projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-6 text-center text-sm text-slate-500">
            Añade algún proyecto personal, open source o iniciativa interna para mostrar impacto adicional.
          </p>
        ) : null}
      </div>
    </FormSection>
  );
};
