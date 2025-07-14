import { FunctionalComponent } from "vue";
import { LucideProps } from "lucide-vue-next";

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  icon: string | FunctionalComponent<LucideProps, {}, any, {}>;
  downloadUrl?: string;
}

export interface Skill {
  name: string;
  category: Category["id"];
  level: number;
  color: string;
  icon: any;
  description: string;
  tags: string[];
  experience: string;
  delay: number;
}

export interface Category {
  id: string;
  icon: any;
}
