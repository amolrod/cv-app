"use client";

import Image from "next/image";

import { ContactRow } from "@/components/resume/ContactRow";
import { InlineEditableField } from "@/components/resume/InlineEditableField";
import { formatDateRange, parseSkillGroups } from "@/lib/format";
import { TemplateProps } from "./types";
import { interpretEndValue } from "./helpers";

export const BestPracticeTemplate = ({
  data,
  activeExperienceId,
  onExperienceFieldChange,
  onExperienceBulletChange,
}: TemplateProps) => {
  const { profile, experience, projects, education } = data;
  const skillGroups = parseSkillGroups(profile.skills);
  const achievements = experience
    .flatMap((exp) => exp.bullets.slice(0, 1))
    .filter(Boolean)
    .slice(0, 3);

  const languageTokens = (profile.languages ?? "")
    .split("|")
    .map((token) => token.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b-2 border-slate-900 pb-4">
        <div className="flex items-start gap-5">
          {profile.photo ? (
            <div
              className="shrink-0 overflow-hidden rounded-full border-2 border-slate-300 shadow-md"
              style={{ width: "90px", height: "90px" }}
            >
              <Image
                src={profile.photo}
                alt={profile.name}
                width={90}
                height={90}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          ) : null}
          <div className="flex-1">
            <h1 className="resume-heading text-[2.4em] font-bold tracking-tight text-slate-900 leading-none">
              {profile.name}
            </h1>
            <p className="mt-2 text-[1.15em] font-semibold uppercase tracking-[0.08em] text-slate-600">
              {profile.title}
            </p>
            <ContactRow profile={profile} />
          </div>
        </div>
        {profile.target ? (
          <p className="mt-4 border-l-4 border-[var(--accent)] pl-4 text-[0.95em] font-medium italic leading-relaxed text-slate-700">
            {profile.target}
          </p>
        ) : null}
      </header>

      {profile.summary ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Resumen Profesional
          </h2>
          <p className="text-[0.95em] leading-relaxed text-slate-700">
            {profile.summary}
          </p>
        </section>
      ) : null}

      {achievements.length ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Logros Destacados
          </h2>
          <ul className="mt-3 space-y-2 pl-5 text-sm leading-relaxed text-slate-800 md:text-[0.95em]">
            {achievements.map((achievement, index) => (
              <li key={`achievement-${index}`} className="relative before:absolute before:-left-4 before:content-['▪'] before:text-[var(--accent)] before:font-bold">
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillGroups.length ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Competencias Clave
          </h2>
          <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {skillGroups.map((group, index) => (
              <div key={`skill-group-${index}`} className="leading-snug">
                <p className="resume-heading text-[0.9em] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
                  {group.group}
                </p>
                <p className="mt-1.5 text-[0.9em] text-slate-700">
                  {group.items.join(" • ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {experience.length ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Experiencia Profesional
          </h2>
          <div className="mt-4 space-y-5">
            {experience.map((item) => (
              <article key={item.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="resume-heading flex flex-wrap items-baseline gap-2 text-[1.05em] font-bold text-slate-900">
                    <InlineEditableField
                      value={item.role}
                      onSave={(next) => onExperienceFieldChange(item.id, { role: next })}
                      placeholder="Puesto"
                      experienceId={item.id}
                      ariaLabel="Editar puesto"
                      autoFocus={activeExperienceId === item.id}
                      className="w-auto min-w-[140px]"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-1 text-[0.9em] font-semibold text-slate-600">
                    <InlineEditableField
                      value={item.start}
                      onSave={(next) => onExperienceFieldChange(item.id, { start: next })}
                      placeholder="Inicio"
                      experienceId={item.id}
                      ariaLabel="Editar fecha de inicio"
                      className="w-auto min-w-[80px] px-1 py-0.5"
                    />
                    <span className="text-slate-400">–</span>
                    <InlineEditableField
                      value={item.current ? "Presente" : item.end}
                      onSave={(next) => {
                        const interpreted = interpretEndValue(next);
                        onExperienceFieldChange(item.id, interpreted);
                      }}
                      placeholder="Fin"
                      experienceId={item.id}
                      ariaLabel="Editar fecha de fin"
                      className="w-auto min-w-[80px] px-1 py-0.5"
                    />
                  </div>
                </div>
                <p className="mt-0.5 text-[0.95em] font-semibold italic text-slate-700">
                  <InlineEditableField
                    value={item.company}
                    onSave={(next) => onExperienceFieldChange(item.id, { company: next })}
                    placeholder="Empresa"
                    experienceId={item.id}
                    ariaLabel="Editar empresa"
                    className="w-auto min-w-[140px]"
                  />
                </p>
                {item.bullets.length ? (
                  <ul className="mt-2.5 space-y-2 pl-5 text-sm leading-relaxed text-slate-800 md:text-[0.95em]">
                    {item.bullets.map((bullet, idx) => (
                      <li key={`${item.id}-${idx}`} className="relative leading-relaxed before:absolute before:-left-4 before:content-['▪'] before:text-[var(--accent)] before:font-bold">
                        <InlineEditableField
                          value={bullet}
                          onSave={(next) => onExperienceBulletChange(item.id, idx, next)}
                          placeholder="Describe un impacto medible"
                          experienceId={item.id}
                          ariaLabel={`Editar logro ${idx + 1}`}
                          multiline
                          className="bg-white text-slate-800"
                        />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {projects.length ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Proyectos
          </h2>
          <div className="mt-3 space-y-4">
            {projects.map((project) => (
              <article key={project.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="resume-heading text-[1em] font-bold text-slate-900">
                    {project.name}
                    {project.role ? <span className="font-normal italic text-slate-700"> — {project.role}</span> : ""}
                  </h4>
                  {project.link ? (
                    <a
                      href={project.link}
                      className="text-[0.85em] font-medium text-[var(--accent)] hover:underline"
                    >
                      {project.link.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                </div>
                <p className="mt-1.5 text-[0.9em] leading-relaxed text-slate-700">{project.description}</p>
                {project.technologies ? (
                  <p className="mt-1 text-[0.85em] font-medium text-slate-600">
                    <span className="font-bold">Tecnologías:</span> {project.technologies}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {education.length ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Formación Académica
          </h2>
          <div className="mt-3 space-y-3">
            {education.map((item) => (
              <article key={item.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="resume-heading text-[1em] font-bold text-slate-900">
                    {item.degree}
                  </h4>
                  <span className="text-[0.9em] font-semibold text-slate-600">
                    {formatDateRange(item)}
                  </span>
                </div>
                <p className="text-[0.9em] italic text-slate-700">{item.school}</p>
                {item.details ? (
                  <p className="mt-1 text-[0.85em] text-slate-600">{item.details}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {languageTokens.length ? (
        <section className="avoid-break">
          <h2 className="resume-heading mb-3 border-b border-slate-300 pb-1.5 text-[1.15em] font-bold uppercase tracking-[0.1em] text-slate-900">
            Idiomas
          </h2>
          <ul className="mt-2 flex flex-wrap gap-4 text-[0.9em] font-medium text-slate-700">
            {languageTokens.map((language, index) => (
              <li key={`language-${index}`} className="relative before:mr-1 before:content-['▪'] before:text-[var(--accent)] before:font-bold">
                {language}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};
