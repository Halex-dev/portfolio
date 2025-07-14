<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/bk/Sidebar.vue";
import EducationSection from "@/components/bk/EducationSection.vue";
import SkillsSection from "@/components/bk/SkillsSection.vue";
import ExperienceSection from "@/components/bk/ExperienceSection.vue";
import ProjectsSection from "@/components/bk/ProjectsSection.vue";
import CertificationsSection from "@/components/bk/CertificationsSection.vue";
import HobbiesSection from "@/components/bk/HobbiesSection.vue";
//import ContactSection from "@/components/ContactSection.vue";

const activeSection = ref("education");

const handleSectionVisible = (sectionId: string) => {
  activeSection.value = sectionId;
};
</script>

<template>
  <div class="pt-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row">
        <!-- Sidebar -->
        <Sidebar :activeSection="activeSection" />

        <!-- Main content -->
        <main class="flex-1">
          <EducationSection @section-visible="handleSectionVisible" />
          <SkillsSection @section-visible="handleSectionVisible" />
          <ExperienceSection @section-visible="handleSectionVisible" />
          <ProjectsSection @section-visible="handleSectionVisible" />
          <CertificationsSection @section-visible="handleSectionVisible" />
          <HobbiesSection @section-visible="handleSectionVisible" />
          <!--<ContactSection @section-visible="handleSectionVisible" />-->
        </main>
      </div>
    </div>
  </div>
</template>
