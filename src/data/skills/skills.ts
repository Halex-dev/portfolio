import {
  Code2,
  Server,
  Shield,
  Monitor,
  Settings,
  Database,
  Cloud,
  Globe,
  Terminal,
  GitBranch,
  Layers,
  Network,
  HardDrive,
  Cpu,
} from "lucide-vue-next";

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

// Categories
export const categories: Category[] = [
  { id: "all", icon: Settings },
  { id: "backend", icon: Server },
  { id: "devops", icon: Cloud },
  { id: "security", icon: Shield },
  { id: "frontend", icon: Monitor },
  { id: "software", icon: Code2 },
  { id: "infrastructure", icon: HardDrive },
  { id: "networking", icon: Network },
];

// Skills data
export const skills: Skill[] = [
  // Backend
  {
    name: "NestJS",
    category: "backend",
    level: 80,
    color: "#dc2626",
    icon: Code2,
    description: "Enterprise-grade Node.js framework",
    tags: ["TypeScript", "Decorators", "Microservices"],
    experience: "API scalabili e architetture modulari",
    delay: 100,
  },
  {
    name: "Node.js",
    category: "backend",
    level: 80,
    color: "#339933",
    icon: Code2,
    description: "JavaScript runtime for server-side development",
    tags: ["Express", "NPM", "Async/Await"],
    experience: "Sviluppo backend e API RESTful",
    delay: 200,
  },
  // Development
  {
    name: "Java",
    category: "software",
    level: 75,
    color: "#ed8b00",
    icon: Code2,
    description: "Enterprise applications, Spring framework",
    tags: ["Spring Boot", "Maven", "JPA"],
    experience: "Progetti enterprise e applicazioni web",
    delay: 300,
  },
  {
    name: "C",
    category: "software",
    level: 70,
    color: "#a8b9cc",
    icon: Code2,
    description: "System programming, embedded systems",
    tags: ["GCC", "Memory Management", "Pointers"],
    experience: "Programmazione di sistema e algoritmi",
    delay: 400,
  },
  // Frontend
  {
    name: "Vue.js",
    category: "frontend",
    level: 80,
    color: "#4fc08d",
    icon: Globe,
    description: "Modern reactive applications",
    tags: ["Vue 3", "Composition API", "Pinia"],
    experience: "Applicazioni SPA moderne",
    delay: 0,
  },
  {
    name: "TailwindCSS",
    category: "frontend",
    level: 75,
    color: "#06b6d4",
    icon: Cpu,
    description: "Utility-first CSS framework",
    tags: ["Responsive", "Dark Mode", "Components"],
    experience: "Design system e componenti",
    delay: 100,
  },
  {
    name: "PrimeVue",
    category: "frontend",
    level: 70,
    color: "#007ad9",
    icon: Layers,
    description: "Vue.js component library",
    tags: ["Components", "Themes", "DataTable"],
    experience: "UI components e interfacce professionali",
    delay: 200,
  },
  // DevOps & Infrastructure
  {
    name: "Git",
    category: "devops",
    level: 90,
    color: "#f05032",
    icon: GitBranch,
    description: "Version control, collaboration",
    tags: ["GitHub", "GitLab", "Branching"],
    experience: "Workflow avanzati e team collaboration",
    delay: 0,
  },
  {
    name: "Linux",
    category: "devops",
    level: 85,
    color: "#fcc624",
    icon: Terminal,
    description: "System administration, shell scripting",
    tags: ["Ubuntu", "CentOS", "Bash"],
    experience: "Amministrazione sistemi e automation",
    delay: 100,
  },
  {
    name: "Docker",
    category: "devops",
    level: 75,
    color: "#2496ed",
    icon: Layers,
    description: "Containerization, microservices",
    tags: ["Compose", "Swarm", "Registry"],
    experience: "Containerizzazione e orchestrazione",
    delay: 200,
  },
  {
    name: "Cloud Computing",
    category: "devops",
    level: 70,
    color: "#ff9900",
    icon: Cloud,
    description: "Cloud platforms and services",
    tags: ["Netlify", "Serverless"],
    experience: "Deploy e gestione servizi cloud",
    delay: 100,
  },
  // Database
  {
    name: "SQL",
    category: "database",
    level: 80,
    color: "#336791",
    icon: Database,
    description: "Database design, optimization, queries",
    tags: ["PostgreSQL", "MySQL", "Optimization"],
    experience: "Design e gestione database complessi",
    delay: 300,
  },
  // Security & Networking
  {
    name: "Network Security",
    category: "security",
    level: 80,
    color: "#dc2626",
    icon: Network,
    description: "Network protocols, security analysis",
    tags: ["TCP/IP", "Wireshark", "Firewall"],
    experience: "Analisi reti e sicurezza infrastrutturale",
    delay: 0,
  },
  // Infrastructure & Storage
  {
    name: "TrueNAS",
    category: "infrastructure",
    level: 75,
    color: "#0095d5",
    icon: HardDrive,
    description: "Network-attached storage, ZFS management",
    tags: ["ZFS", "RAID", "SMB/NFS"],
    experience: "Gestione storage enterprise e backup",
    delay: 200,
  },
  {
    name: "WordPress",
    category: "infrastructure",
    level: 75,
    color: "#21759b",
    icon: Globe,
    description: "CMS development, themes, plugins",
    tags: ["PHP", "Custom Themes", "Plugins"],
    experience: "Sviluppo temi personalizzati e plugin",
    delay: 250,
  },
  // Networking
  {
    name: "Networking",
    category: "networking",
    level: 85,
    color: "#2563eb",
    icon: Network,
    description: "Network infrastructure, protocols, DNS",
    tags: ["DNS", "DHCP", "VLANs", "Routing"],
    experience: "Configurazione reti e servizi di rete",
    delay: 300,
  },
];
