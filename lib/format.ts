import { CVData, Education, Experience } from "@/types/cv";

export const parseSkillGroups = (skills?: string) => {
  if (!skills) return [] as { group: string; items: string[] }[];
  return skills
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const [group, itemsRaw] = segment.split(":");
      const items = (itemsRaw ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      return {
        group: (group ?? "").trim(),
        items,
      };
    })
    .filter(({ group, items }) => group || items.length);
};

export const formatDateRange = (item: Experience | Education) => {
  const end = "current" in item && item.current ? "Actualidad" : item.end;
  if (!item.start && !end) return "";
  if (!item.start) return `${end}`;
  if (!end) return `${item.start}`;
  return `${item.start} — ${end}`;
};

export const buildPlainTextFromCv = (data: CVData) => {
  const skills = parseSkillGroups(data.profile.skills).flatMap((group) =>
    group.items
  );
  const bullets = data.experience.flatMap((exp) => exp.bullets);
  const educationDetails = data.education.map((edu) => edu.details ?? "");
  const projectDetails = data.projects.map(
    (proj) => `${proj.name} ${proj.description} ${proj.technologies ?? ""}`
  );
  return [
    data.profile.name,
    data.profile.title,
    data.profile.summary,
    data.profile.target,
    skills.join(" "),
    bullets.join(" "),
    educationDetails.join(" "),
    projectDetails.join(" "),
    data.profile.languages,
  ]
    .filter(Boolean)
    .join(" ");
};
