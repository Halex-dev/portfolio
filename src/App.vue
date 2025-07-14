<script setup lang="ts">
import AppNavbar from "@/components/layout/AppNavbar.vue";
import Home from "@/views/Home.vue";
import About from "@/components/pages/About.vue";
import Skills from "@/components/pages/Skills.vue";
import Experience from "@/components/pages/Experience.vue";
import Projects from "@/components/pages/Projects.vue";
import Contact from "@/components/pages/Contact.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <main class="flex-grow">
      <!-- Single page con tutte le sezioni -->
      <Home id="home" />
      <About id="about" />
      <Skills id="skills" />
      <Experience id="experience" />
      <Projects id="projects" />
      <Contact id="contact" />
    </main>
  </div>
</template>
