"use client";

import { ContactRow } from "@/components/resume/ContactRow";
import { InlineEditableField } from "@/components/resume/InlineEditableField";
import { formatDateRange, parseSkillGroups } from "@/lib/format";
import { TemplateProps } from "./types";
import { interpretEndValue } from "./helpers";

export const SimpleTemplate = ({
  data,
  activeExperienceId,
  onExperienceFieldChange,
  onExperienceBulletChange,
}: TemplateProps) => {
  const { profile, experience, projects, education } = data;
  const skillGroups = parseSkillGroups(profile.skills);
  const languages = (profile.languages ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="resume-heading text-[2em] font-semibold text-slate-900">
          {profile.name}
        </h1>
        <p className="text-[1em] font-medium text-slate-700">{profile.title}</p>
        {profile.summary ? (
          <p className="mt-2 text-[0.95em] leading-relaxed text-slate-600">
            {profile.summary}
          </p>
        ) : null}
        <ContactRow profile={profile} />
      </header>

      {skillGroups.length ? (
        <section className="avoid-break">
          <h3 className="resume-heading text-[1em] font-semibold text-slate-800">
            Habilidades clave
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {skillGroups.flatMap((group) =>
              group.items.map((item) => (
                <span
                  key={`${group.group}-${item}`}
                  className="rounded-full border border-slate-300 px-3 py-1 text-[0.85em] text-slate-600"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </section>
      ) : null}

      <section className="avoid-break">
        <h3 className="resume-heading text-[1em] font-semibold text-slate-800">
          Experiencia profesional
        </h3>
        <div className="mt-3 space-y-4">
          {experience.map((item) => (
            <article key={item.id} className="leading-relaxed">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="resume-heading flex flex-wrap items-baseline gap-2 text-[0.95em] font-semibold text-slate-800">
                  <InlineEditableField
                    value={item.role}
                    onSave={(next) => onExperienceFieldChange(item.id, { role: next })}
                    placeholder="Puesto"
                    experienceId={item.id}
                    ariaLabel="Editar puesto"
                    autoFocus={activeExperienceId === item.id}
                    className="w-auto min-w-[140px]"
                  />
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500">
                    <InlineEditableField
                      value={item.company}
                      onSave={(next) => onExperienceFieldChange(item.id, { company: next })}
                      placeholder="Empresa"
                      experienceId={item.id}
                      ariaLabel="Editar empresa"
                      className="w-auto min-w-[140px] text-slate-500"
                    />
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[0.8em] text-slate-500">
                  <InlineEditableField
                    value={item.start}
                    onSave={(next) => onExperienceFieldChange(item.id, { start: next })}
                    placeholder="Inicio"
                    experienceId={item.id}
                    ariaLabel="Editar fecha de inicio"
                    className="w-auto min-w-[70px] px-1 py-0.5"
                  />
                  <span className="text-slate-400">–</span>
                  <InlineEditableField
                    value={item.current ? "Actualidad" : item.end}
                    onSave={(next) => onExperienceFieldChange(item.id, interpretEndValue(next))}
                    placeholder="Fin"
                    experienceId={item.id}
                    ariaLabel="Editar fecha de fin"
                    className="w-auto min-w-[70px] px-1 py-0.5"
                  />
                </div>
              </div>
              {item.bullets.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9em] text-slate-600">
                  {item.bullets.map((bullet, idx) => (
                    <li key={`${item.id}-${idx}`} className="leading-relaxed">
                      <InlineEditableField
                        value={bullet}
                        onSave={(next) => onExperienceBulletChange(item.id, idx, next)}
                        placeholder="Describe un impacto medible"
                        experienceId={item.id}
                        ariaLabel={`Editar logro ${idx + 1}`}
                        multiline
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {projects.length ? (
        <section className="avoid-break">
          <h3 className="resume-heading text-[1em] font-semibold text-slate-800">
            Proyectos
          </h3>
          <div className="mt-3 space-y-3 text-[0.95em] text-slate-600">
            {projects.map((project) => (
              <div key={project.id}>
                <p className="resume-heading text-[0.95em] font-semibold text-slate-700">
                  {project.name}
                  {project.role ? ` · ${project.role}` : ""}
                </p>
                <p className="mt-1">{project.description}</p>
                {project.technologies ? (
                  <p className="text-[0.85em] text-slate-500">
                    Tecnologías: {project.technologies}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {education.length ? (
        <section className="avoid-break">
          <h3 className="resume-heading text-[1em] font-semibold text-slate-800">
            Educación
          </h3>
          <div className="mt-3 space-y-2 text-[0.9em] text-slate-600">
            {education.map((item) => (
              <div key={item.id}>
                <p className="font-semibold text-slate-700">{item.degree}</p>
                <p>{item.school}</p>
                <p className="text-[0.8em] text-slate-500">{formatDateRange(item)}</p>
                {item.details ? (
                  <p className="text-[0.85em] text-slate-500">{item.details}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {languages.length ? (
        <section className="avoid-break">
          <h3 className="resume-heading text-[1em] font-semibold text-slate-800">
            Idiomas
          </h3>
          <div className="mt-2 flex flex-wrap gap-2 text-[0.9em] text-slate-600">
            {languages.map((language, index) => (
              <span key={`language-${index}`} className="rounded-full bg-slate-100 px-3 py-1">
                {language}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};
