import {
  Shield,
  Lock,
  Server,
  Cloud,
  Globe,
  Database,
  Code2,
} from "lucide-vue-next";

import { ProjectType, Project } from "./types";

export const mainProject = false;

export const mainProjectFeatures = ["security", "responsive", "api", "testing"];

export const mainProjectTech = [
  { name: "Python", color: "#3776ab", icon: Code2 },
  { name: "Django", color: "#092e20", icon: Server },
  { name: "PostgreSQL", color: "#336791", icon: Database },
  { name: "Docker", color: "#2496ed", icon: Cloud },
  { name: "Vue.js", color: "#4fc08d", icon: Globe },
];

export const otherProjects: Project[] = [
  {
    id: "walletwise",
    type: ProjectType.LIVE,
    icon: Shield,
    color: "#22c55e",
    liveUrl: null,
    technologies: ["Vue.js", "Tailwind", "PrimeVue", "Supabase"],
    githubUrl: "https://github.com/Halex-dev/walletwise",
  },
  {
    id: "passtransfer-unipi",
    type: ProjectType.LIVE,
    icon: Cloud,
    color: "#22c55e",
    technologies: [
      "Nest.js",
      "JWT",
      "PostgreSQL",
      "Redis",
      "Vue.js",
      "PrimeVue",
      "Tailwind",
    ],
    liveUrl: "https://passandtransfer.di.unipi.it/",
    githubUrl: "https://github.com/Halex-dev/passtransfer-unipi",
  },
  {
    id: "nasdesktop",
    type: ProjectType.CONCEPT,
    icon: Cloud,
    color: "#0ea5e9",
    technologies: ["Vue.js", "NestJS", "PostgreSQL", "Docker"],
  },
  {
    id: "secureapi",
    type: ProjectType.CONCEPT,
    icon: Lock,
    color: "#dc2626",
    technologies: ["Node.js", "JWT", "Redis", "Docker"],
    liveUrl: null,
    githubUrl: "https://github.com/Halex-dev/api-gateway",
  },
];
