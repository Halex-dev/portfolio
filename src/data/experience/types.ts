import { LucideProps } from "lucide-vue-next";
import { FunctionalComponent } from "vue";

export interface TimelinePeriod {
  start: string;
  end: string;
}

export interface TimelineLink {
  type: string;
  url: string;
  icon: string | FunctionalComponent<LucideProps, {}, any, {}>;
}

export interface TimelineItem {
  id: string;
  period: TimelinePeriod;
  icon: string | FunctionalComponent<LucideProps, {}, any, {}>;
  color: string;
  status?: string;
  statusClass?: string;
  nodeClass: string;
  contentClass: string;
  cardClass: string;
  highlight?: boolean;
  technologies: string[];
  achievements: string[];
  links?: TimelineLink[];
}

export interface TimelineConfig {
  timeline: TimelineItem[];
}
