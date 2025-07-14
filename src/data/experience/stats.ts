import { Code2, Award, Clock, FolderOpen } from "lucide-vue-next";

export interface StatItem {
  key: string;
  value: string;
  icon: any;
  color: string;
}

export const stats: StatItem[] = [
  {
    key: "experience",
    value: "5+",
    icon: Clock,
    color: "#0ea5e9",
  },
  {
    key: "projects",
    value: "10+",
    icon: FolderOpen,
    color: "#22c55e",
  },
  {
    key: "technologies",
    value: "15+",
    icon: Code2,
    color: "#f59e0b",
  },
  {
    key: "certifications",
    value: "1",
    icon: Award,
    color: "#8b5cf6",
  },
];
