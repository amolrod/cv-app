import Image from "next/image";

import { ContactRow } from "@/components/resume/ContactRow";
import { SectionTitle } from "@/components/resume/SectionTitle";
import { formatDateRange, parseSkillGroups } from "@/lib/format";
import { TemplateProps } from "./types";

export const BestPracticeTemplate = ({ data }: TemplateProps) => {
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
    <div className="flex flex-col gap-7">
      <header className="flex items-start gap-4">
        {profile.photo ? (
          <div
            className="shrink-0 overflow-hidden rounded-xl border border-slate-200"
            style={{ width: "80px", height: "80px" }}
          >
            <Image
              src={profile.photo}
              alt={profile.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        ) : null}
        <div className="flex-1">
          <h1 className="resume-heading text-[2.1em] font-semibold text-slate-900">
            {profile.name}
          </h1>
          <p className="text-[1.1em] font-medium text-slate-700">
            {profile.title}
          </p>
          {profile.target ? (
            <p className="mt-2 text-[0.95em] text-slate-600">{profile.target}</p>
          ) : null}
          {profile.summary ? (
            <p className="mt-3 text-[0.95em] leading-relaxed text-slate-600">
              {profile.summary}
            </p>
          ) : null}
          <ContactRow profile={profile} />
        </div>
      </header>

      {achievements.length ? (
        <section className="avoid-break">
          <SectionTitle label="Logros" />
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95em] text-slate-700">
            {achievements.map((achievement, index) => (
              <li key={`achievement-${index}`}>{achievement}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {skillGroups.length ? (
        <section className="avoid-break">
          <SectionTitle label="Habilidades" />
          <div className="mt-3 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {skillGroups.map((group, index) => (
              <div key={`skill-group-${index}`} className="leading-snug">
                <p className="resume-heading text-[0.9em] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  {group.group}
                </p>
                <p className="mt-1 text-[0.9em] text-slate-600">
                  {group.items.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {experience.length ? (
        <section className="avoid-break">
          <SectionTitle label="Experiencia" />
          <div className="mt-4 space-y-5">
            {experience.map((item) => (
              <article key={item.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="resume-heading text-[1em] font-semibold text-slate-800">
                    {item.role} · {item.company}
                  </h4>
                  <span className="text-[0.85em] font-medium text-slate-500">
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
      ) : null}

      {projects.length ? (
        <section className="avoid-break">
          <SectionTitle label="Proyectos" />
          <div className="mt-3 space-y-4">
            {projects.map((project) => (
              <article key={project.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="resume-heading text-[1em] font-semibold text-slate-800">
                    {project.name}
                    {project.role ? ` · ${project.role}` : ""}
                  </h4>
                  {project.link ? (
                    <a
                      href={project.link}
                      className="text-[0.85em] text-slate-600"
                    >
                      {project.link.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                </div>
                <p className="mt-1 text-[0.9em] text-slate-600">{project.description}</p>
                {project.technologies ? (
                  <p className="mt-1 text-[0.85em] text-slate-500">
                    Tecnologías: {project.technologies}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {education.length ? (
        <section className="avoid-break">
          <SectionTitle label="Educación" />
          <div className="mt-3 space-y-3">
            {education.map((item) => (
              <article key={item.id} className="leading-relaxed">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="resume-heading text-[1em] font-semibold text-slate-800">
                    {item.degree}
                  </h4>
                  <span className="text-[0.85em] font-medium text-slate-500">
                    {formatDateRange(item)}
                  </span>
                </div>
                <p className="text-[0.9em] text-slate-600">{item.school}</p>
                {item.details ? (
                  <p className="mt-1 text-[0.85em] text-slate-500">{item.details}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {languageTokens.length ? (
        <section className="avoid-break">
          <SectionTitle label="Idiomas" />
          <ul className="mt-2 flex flex-wrap gap-4 text-[0.9em] text-slate-600">
            {languageTokens.map((language, index) => (
              <li key={`language-${index}`}>{language}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};
