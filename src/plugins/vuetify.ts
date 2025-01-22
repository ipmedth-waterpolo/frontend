/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";


/**
 * Verander hier de kleuren.
 * Background is achtergrond
 * Surface is de kleur van de menubalk en de 'kaarten' (v-card)
 * error zijn de rode kleuren die worden gebruikt bij bijvoorbeeld delete-knoppen
 */

const ZVLlichtBlauw = '#00A2E0';
const ZVLdonkerBlauw = '#003056';
const ZVLrood = '#E62418';

const customLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    primary: ZVLlichtBlauw,
    secondary: ZVLdonkerBlauw,
    error: ZVLrood,
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#18181a',
    surface: '#212121',
    primary: ZVLlichtBlauw,
    secondary: ZVLdonkerBlauw,
    error: ZVLrood,
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

// Composables
import {createVuetify, type ThemeDefinition} from "vuetify";

const prefersDark = window.matchMedia("(prefers-color-scheme: dark").matches;

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: prefersDark ? "dark" : "light",
    themes: {
      light: customLightTheme,
      dark: customDarkTheme,
    },
  },
  defaults: {
    global: {
      transition: 'no',
      ripple: false,
    }
  }
});
