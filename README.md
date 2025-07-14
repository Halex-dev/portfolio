# 🚀 Personal Portfolio

A modern, responsive portfolio website built with Vue 3 and Vite, showcasing expertise in backend development, DevOps engineering, and cybersecurity.

## ✨ Features

- **🌓 Dark/Light Theme Toggle** - Persistent theme switching with system preference detection
- **🌐 Internationalization** - English and Italian language support
- **🎨 Interactive Particle Background** - Animated particle system with performance optimizations
- **📱 Responsive Design** - Mobile-first approach with smooth animations
- **⚡ Performance Optimized** - Battery awareness, reduced motion support, and adaptive loading
- **🎯 Smooth Navigation** - Scroll-spy navigation with active section highlighting
- **⌨️ TypeScript Support** - Full type safety throughout the codebase
- **🎪 GSAP Animations** - Smooth transitions and element reveals

## 🛠️ Tech Stack

### Core Technologies

- **Vue 3** with Composition API and `<script setup>` syntax
- **Vite** - Fast development server and optimized builds
- **TypeScript** - Type safety and enhanced developer experience
- **Tailwind CSS 4.1** - Utility-first styling with dark mode support

### Libraries & Tools

- **Vue i18n** - Internationalization framework
- **GSAP** - Animation library for smooth transitions
- **@tsparticles/vue3** - Interactive particle background effects
- **Lucide Vue** - Modern icon library
- **PrimeIcons** - Additional icon set (Business icon)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── ParticleBackground.vue    # Interactive particle system
│   │   ├── StatusBadge.vue           # Availability status indicator
│   │   ├── ThemeToggle.vue           # Dark/light mode switcher
│   │   └── TypingText.vue            # Animated typing effect
│   ├── layout/          # Layout components
│   │   └── AppNavbar.vue             # Navigation with mobile support
│   └── pages/           # Section components
│       ├── About.vue                 # Personal information
│       ├── Contact.vue               # Contact form and links
│       ├── Experience.vue            # Timeline and career history
│       ├── Projects.vue              # Portfolio projects
│       └── Skills.vue                # Technical skills display
├── composables/         # Reusable logic (theme, performance, scroll)
├── data/                # Static content organized by feature
├── i18n/                # Internationalization setup and locales
├── views/               # Top-level views (Home, Portfolio)
└── assets/              # Static assets and CSS
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (preferred) or npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/Halex-dev/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
pnpm install
# or
npm install
```

3. Start the development server

```bash
pnpm dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

## 🎯 Key Features Breakdown

### 🎨 Interactive Particle Background

- **Adaptive Performance**: Automatically adjusts particle density based on device capabilities
- **Battery Awareness**: Reduces animations on low battery devices
- **Multiple Color Schemes**: Supports different themes and color configurations
- **Touch Interactions**: Responsive to mouse and touch events

### 🌐 Internationalization

- **English/Italian Support**: Complete translations for all content
- **Dynamic Language Switching**: Real-time language toggle
- **Locale-specific Formatting**: Proper date, number, and text formatting

### 📱 Performance Optimizations

- **Reduced Motion Support**: Respects user accessibility preferences
- **Lazy Loading**: Efficient loading of components and assets
- **Connection Awareness**: Adapts features based on network conditions
- **Mobile Optimization**: Touch-friendly interactions and optimized animations

### 🎯 Smart Navigation

- **Scroll Spy**: Automatically highlights active sections
- **Smooth Scrolling**: Fluid navigation between sections
- **Mobile Menu**: Responsive hamburger menu with slide animations
- **Progress Indicator**: Visual scroll progress feedback

## 🔧 Development

### Code Style

- **ESLint**: Linting with Vue and TypeScript support
- **Prettier**: Code formatting with Tailwind CSS plugin
- **Type Safety**: Full TypeScript coverage

### Component Patterns

- **Composition API**: Uses `<script setup>` syntax throughout
- **Composables**: Reusable logic for theme, performance, and scroll management
- **Props & Emits**: Proper TypeScript interfaces for component communication

### State Management

- **Local Storage**: Persistent theme and language preferences
- **Reactive State**: Vue 3 reactivity for dynamic updates
- **Performance Monitoring**: Real-time capability detection

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Alessio Vito D'Angelo**
