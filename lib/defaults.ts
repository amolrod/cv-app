import { BuilderState } from "@/types/cv";

export const ACCENT_PRESETS = [
  { value: "#0F6D53", label: "Verde pro" },
  { value: "#1F3A5F", label: "Azul marino" },
  { value: "#333333", label: "Carbón" },
  { value: "#7A1E2E", label: "Borgoña" }
];

export const FONT_PRESETS = [
  {
    id: 0,
    heading: "Montserrat",
    body: "Lato",
    label: "Montserrat + Lato"
  },
  {
    id: 1,
    heading: "Poppins",
    body: "Inter",
    label: "Poppins + Inter"
  },
  {
    id: 2,
    heading: "Nunito Sans",
    body: "Nunito Sans",
    label: "Nunito Sans"
  }
] as const;

export const INITIAL_STATE: BuilderState = {
  data: {
    profile: {
      name: "Ada Lovelace",
      title: "Senior Software Engineer",
      summary:
        "Ingeniera de software con foco en plataformas web escalables y experiencias accesibles.",
      target:
        "Busco liderar equipos front-end que construyan productos centrados en usuarios.",
      email: "ada@example.com",
      phone: "+34 600 000 000",
      location: "Madrid, España",
      website: "https://adalabs.dev",
      linkedin: "https://www.linkedin.com/in/adalovelace",
      github: "https://github.com/adalabs",
      skills:
        "Frontend: React, Next.js, TypeScript, Tailwind CSS; Backend: Node.js, GraphQL, PostgreSQL; Tooling: Vite, Turbopack, Playwright; Cloud: Vercel, AWS, Docker",
      languages: "Español — nativo | Inglés — C1"
    },
    experience: [
      {
        id: "exp-1",
        company: "TechNova",
        role: "Lead Frontend Engineer",
        start: "2021",
        end: "Actualidad",
        current: true,
        bullets: [
          "Dirigí la migración a Next.js 14 con tiempos de carga 35% más rápidos (Core Web Vitals).",
          "Organicé rituales de discovery con diseño y producto para elevar el NPS de 42 a 65.",
          "Implementé Playwright CI reduciendo fallos de regresión en un 70%."
        ]
      },
      {
        id: "exp-2",
        company: "InnovaSoft",
        role: "Senior Frontend Engineer",
        start: "2018",
        end: "2021",
        current: false,
        bullets: [
          "Diseñé librería de componentes accesibles reutilizada en 5 squads, reduciendo deuda UI 40%.",
          "Introduje métricas de error tracking en producción bajando incidencias críticas en 55%."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        school: "Universidad Politécnica",
        degree: "Grado en Ingeniería Informática",
        start: "2011",
        end: "2015",
        details: "Proyecto final enfocado en visualización de datos en tiempo real."
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "Curriculum Builder",
        role: "Product Lead & Frontend",
        description:
          "Aplicación Next.js para generar CVs ATS con exportación A4, controles de diseño y analizador de ofertas.",
        technologies: "Next.js 14, TypeScript, Tailwind, Playwright",
        link: "https://adalabs.dev/cv-builder",
      }
    ]
  },
  ui: {
    template: "best",
    fontPreset: 0,
    accent: "#0F6D53",
    baseSizePt: 12,
    compact: false
  },
  jdText: ""
};
