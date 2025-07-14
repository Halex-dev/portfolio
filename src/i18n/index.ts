import { createI18n } from "vue-i18n";

// Translations
import enMessages from "@/i18n/locales/en.json";
import itMessages from "@/i18n/locales/it.json";

const i18n = createI18n({
  legacy: false,
  locale: "it",
  fallbackLocale: "it",
  messages: {
    en: enMessages,
    it: itMessages,
  },
});

export default i18n;
