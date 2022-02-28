import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "locales/en/translation.json";
import ru from "locales/ru/translation.json";
import { getItemFromLocalStorage } from "helpers/localStorage";

const locales = {
  en,
  ru,
};

i18n.use(initReactI18next).init({
  lng: getItemFromLocalStorage("lng") || "en",
  fallbackLng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
  resources: locales,
});

export default i18n;
