import { BuilderState, Education, Experience, Project } from "@/types/cv";
import { INITIAL_STATE } from "@/lib/defaults";

const createId = () => {
  const cryptoApi =
    typeof globalThis !== "undefined"
      ? (globalThis as typeof globalThis & { crypto?: Crypto }).crypto
      : undefined;
  if (cryptoApi && "randomUUID" in cryptoApi) {
    return cryptoApi.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

const normalizeExperience = (items?: Experience[]) => {
  if (!items) return INITIAL_STATE.data.experience;
  return items.map((item) => ({
    id: item.id ?? createId(),
    company: item.company ?? "",
    role: item.role ?? "",
    start: item.start ?? "",
    end: item.end ?? "",
    current: item.current ?? false,
    bullets: item.bullets && item.bullets.length ? item.bullets : [""],
  }));
};

const normalizeEducation = (items?: Education[]) => {
  if (!items) return INITIAL_STATE.data.education;
  return items.map((item) => ({
    id: item.id ?? createId(),
    school: item.school ?? "",
    degree: item.degree ?? "",
    start: item.start ?? "",
    end: item.end ?? "",
    details: item.details ?? "",
  }));
};

const normalizeProjects = (items?: Project[]) => {
  if (!items) return INITIAL_STATE.data.projects;
  return items.map((item) => ({
    id: item.id ?? createId(),
    name: item.name ?? "",
    role: item.role ?? "",
    description: item.description ?? "",
    technologies: item.technologies ?? "",
    link: item.link ?? "",
  }));
};

export const normalizeState = (incoming: Partial<BuilderState>): BuilderState => ({
  data: {
    profile: {
      ...INITIAL_STATE.data.profile,
      ...(incoming.data?.profile ?? {}),
    },
    experience: normalizeExperience(incoming.data?.experience),
    education: normalizeEducation(incoming.data?.education),
    projects: normalizeProjects(incoming.data?.projects),
  },
  ui: {
    ...INITIAL_STATE.ui,
    ...(incoming.ui ?? {}),
  },
  jdText: incoming.jdText ?? "",
});

export const normalizeLoadedState = (incoming: BuilderState) =>
  normalizeState(incoming);
