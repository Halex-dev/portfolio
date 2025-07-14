import { ref, onMounted, onUnmounted } from "vue";

export function useScrollspy(sections: string[], offset: number = 100) {
  const activeSection = ref<string>("");

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        activeSection.value = sections[i];
        break;
      }
    }
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - offset + 50;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  onMounted(() => {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", updateActiveSection);
  });

  return {
    activeSection,
    scrollToSection,
  };
}
