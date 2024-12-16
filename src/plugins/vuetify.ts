/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark").matches;

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: prefersDark ? "dark" : "light",
  },
  defaults: {
    global: {
      transition: 'no',
      ripple: false,
    }
  }
});
