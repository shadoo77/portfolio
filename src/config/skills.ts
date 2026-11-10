/**
 * Mirrors the skills section of `cvData.ts` so the site and the CV stay in sync
 * without publishing a downloadable document.
 */
export const skillGroups = [
  {
    key: "languages",
    items: ["JavaScript", "TypeScript", "PHP", "HTML / CSS", "Sass"],
  },
  {
    key: "frontend",
    items: [
      "React",
      "Next.js",
      "Redux Toolkit",
      "Material-UI",
      "Tailwind CSS",
      "Inertia.js",
      "Vite",
    ],
  },
  { key: "backend", items: ["Node.js", "Laravel"] },
  { key: "data", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { key: "tooling", items: ["Git", "GitLab CI/CD", "Jira / Scrum", "Cypress"] },
  {
    key: "ai",
    items: ["Claude Code", "LLM prompting", "GitHub Copilot", "AI agents"],
  },
] as const;

export type SkillGroupKey = (typeof skillGroups)[number]["key"];
