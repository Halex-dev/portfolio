import timelineData from "./timeline.json";
import type { TimelineConfig, TimelineItem } from "./types";

import {
  Code2,
  Award,
  GraduationCap,
  BookOpen,
  ExternalLink,
} from "lucide-vue-next";

// Icon mapping for string to component conversion
const iconMap = {
  Code2,
  Award,
  GraduationCap,
  BookOpen,
  ExternalLink,
};

export function getTimelineItems(): TimelineItem[] {
  const config = timelineData as TimelineConfig;

  return config.timeline.map((item) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap] || Code2,
    links:
      item.links?.map((link) => ({
        ...link,
        icon: iconMap[link.icon as keyof typeof iconMap] || ExternalLink,
      })) || [],
  }));
}

export type { TimelineItem };
