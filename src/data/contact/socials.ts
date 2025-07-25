export type SocialLink = {
  name: string;
  platform: string;
  icon: string;
  url: string;
  displayText: string;
  color: string;
  bgColor: string;
  external: boolean;
  featured: boolean;
  followers: number;
};

// Social Links Configuration
export const socialLinks: SocialLink[] = [
  {
    name: "linkedin",
    platform: "LinkedIn",
    icon: "pi pi-linkedin",
    url: "https://www.linkedin.com/in/alessio-vito-dangelo/",
    displayText: "alessio-vito-dangelo",
    color: "#0ea5e9",
    bgColor: "#0ea5e915",
    external: true,
    featured: true,
    followers: 0,
  },
  {
    name: "github",
    platform: "GitHub",
    icon: "pi pi-github",
    url: "https://github.com/Halex-dev",
    displayText: "Halex-dev",
    color: "#24292e",
    bgColor: "#f6f8fa",
    external: true,
    featured: true,
    followers: 0,
  },
  {
    name: "discord",
    platform: "Discord",
    icon: "pi pi-discord",
    url: null,
    displayText: "halex_",
    color: "#5865f2",
    bgColor: "#5865f215",
    external: false,
    featured: true,
    followers: 0,
  },
];
