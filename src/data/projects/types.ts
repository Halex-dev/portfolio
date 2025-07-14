import { LucideProps } from "lucide-vue-next";
import { FunctionalComponent } from "vue";

export enum ProjectType {
  LIVE = "live",
  WIP = "wip",
  CONCEPT = "concept",
}

export interface Project {
  id: string;
  type: ProjectType;
  icon: string | FunctionalComponent<LucideProps, {}, any, {}>;
  color: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}
