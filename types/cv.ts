export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  current: boolean;
  bullets: string[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  start: string;
  end: string;
  details?: string;
};

export type Project = {
  id: string;
  name: string;
  role?: string;
  description: string;
  technologies?: string;
  link?: string;
};

export type Profile = {
  name: string;
  title: string;
  target?: string;
  summary?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string;
  skills?: string;
  languages?: string;
};

export type CVData = {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  projects: Project[];
};

export type TemplateId = "best" | "classic" | "simple" | "visual2col";

export type FontPreset = 0 | 1 | 2;

export type UIState = {
  template: TemplateId;
  fontPreset: FontPreset;
  accent: string;
  baseSizePt: number;
  compact: boolean;
};

export type BuilderState = {
  data: CVData;
  ui: UIState;
  jdText: string;
};

export type MoveDirection = "up" | "down";

export type BuilderAction =
  | { type: "updateProfile"; payload: Partial<Profile> }
  | { type: "addExperience"; payload: Experience }
  | { type: "patchExperience"; payload: { id: string; patch: Partial<Experience> } }
  | { type: "removeExperience"; payload: { id: string } }
  | { type: "moveExperience"; payload: { id: string; direction: MoveDirection } }
  | { type: "addEducation"; payload: Education }
  | { type: "patchEducation"; payload: { id: string; patch: Partial<Education> } }
  | { type: "removeEducation"; payload: { id: string } }
  | { type: "moveEducation"; payload: { id: string; direction: MoveDirection } }
  | { type: "addProject"; payload: Project }
  | { type: "patchProject"; payload: { id: string; patch: Partial<Project> } }
  | { type: "removeProject"; payload: { id: string } }
  | { type: "moveProject"; payload: { id: string; direction: MoveDirection } }
  | { type: "updateUi"; payload: Partial<UIState> }
  | { type: "reset"; payload: BuilderState }
  | { type: "setJdText"; payload: string };
