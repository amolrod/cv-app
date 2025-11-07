import { Education, Experience, Project } from "@/types/cv";

const createId = () => {
  const cryptoApi = typeof globalThis !== "undefined" ? (globalThis as typeof globalThis & { crypto?: Crypto }).crypto : undefined;
  if (cryptoApi && "randomUUID" in cryptoApi) {
    return cryptoApi.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
};

export const createEmptyExperience = (): Experience => ({
  id: createId(),
  company: "",
  role: "",
  start: "",
  end: "",
  current: false,
  bullets: [""]
});

export const createEmptyEducation = (): Education => ({
  id: createId(),
  school: "",
  degree: "",
  start: "",
  end: "",
  details: ""
});

export const createEmptyProject = (): Project => ({
  id: createId(),
  name: "",
  role: "",
  description: "",
  technologies: "",
  link: "",
});
