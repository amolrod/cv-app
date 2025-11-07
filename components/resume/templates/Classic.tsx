import { ContactRow } from "@/components/resume/ContactRow";
import { SectionTitle } from "@/components/resume/SectionTitle";
import { formatDateRange, parseSkillGroups } from "@/lib/format";
import { TemplateProps } from "./types";

export const ClassicTemplate = ({ data }: TemplateProps) => {
  const { profile, experience, education, projects } = data;
  const skillGroups = parseSkillGroups(profile.skills);
  const languages = (profile.languages ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-7">
      <header className="text-center">
        <h1 className="resume-heading text-[2.3em] font-semibold tracking-tight text-slate-900">
          {profile.name}
        </h1>
        <p className="mt-1 text-[1.05em] font-medium text-slate-700">
          {profile.title}
        </p>
        {profile.summary ? (
          <p className="mt-3 text-[0.95em] leading-relaxed text-slate-600">
            {profile.summary}
          </p>
        ) : null}
        <ContactRow profile={profile} />
      </header>

      <section className="avoid-break">
        <SectionTitle label="Experiencia" />
        <div className="mt-4 space-y-4">
          {experience.map((item) => (
            <article key={item.id} className="leading-relaxed">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="resume-heading text-[1em] font-semibold text-slate-800">
                  {item.role}
                  <span className="text-slate-500"> · {item.company}</span>
                </h4>
                <span className="text-[0.85em] text-slate-500">
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
          <SectionTitle label="Proyectos" />
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
                {project.link ? (
                  <a href={project.link} className="text-[0.85em] text-slate-600">
                    {project.link.replace(/^https?:\/\//, "")}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {education.length ? (
        <section className="avoid-break">
          <SectionTitle label="Educación" />
          <div className="mt-3 space-y-3">
            {education.map((item) => (
              <div key={item.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="resume-heading text-[0.95em] font-semibold text-slate-700">
                    {item.degree}
                  </h4>
                  <span className="text-[0.8em] text-slate-500">
                    {formatDateRange(item)}
                  </span>
                </div>
                <p className="text-[0.9em] text-slate-600">{item.school}</p>
                {item.details ? (
                  <p className="text-[0.85em] text-slate-500">{item.details}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {skillGroups.length ? (
        <section className="avoid-break">
          <SectionTitle label="Competencias" />
          <div className="mt-3 space-y-2 text-[0.9em] text-slate-600">
            {skillGroups.map((group, index) => (
              <p key={`skill-group-${index}`}>
                <span className="resume-heading font-semibold text-slate-700">
                  {group.group}:
                </span>{" "}
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {languages.length ? (
        <section className="avoid-break">
          <SectionTitle label="Idiomas" />
          <p className="mt-2 text-[0.9em] text-slate-600">
            {languages.join(" · ")}
          </p>
        </section>
      ) : null}
    </div>
  );
};
