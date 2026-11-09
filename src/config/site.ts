import { env } from "@/lib/env";

export const siteConfig = {
  name: "Mohamad Shadi Omar",
  shortName: "Shadi.",
  url: env.NEXT_PUBLIC_SITE_URL,
  email: "shadi.omar077@gmail.com",
  location: "Zeist, Utrecht, Netherlands",
  links: {
    github: "https://github.com/shadoo77",
    linkedin: "https://www.linkedin.com/in/shadi-amr/",
  },
} as const;
