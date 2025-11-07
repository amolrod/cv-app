import { ContactRow } from "@/components/resume/ContactRow";
import { formatDateRange, parseSkillGroups } from "@/lib/format";
import { TemplateProps } from "./types";

export const SimpleTemplate = ({ data }: TemplateProps) => {
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
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="resume-heading text-[0.95em] font-semibold text-slate-800">
                  {item.role}
                  <span className="text-slate-500"> · {item.company}</span>
                </h4>
                <span className="text-[0.8em] text-slate-500">
                  {formatDateRange(item)}
                </span>
              </div>
              {item.bullets.length ? (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9em] text-slate-600">
                  {item.bullets.map((bullet, idx) => (
                    <li key={`${item.id}-${idx}`}>{bullet}</li>
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
