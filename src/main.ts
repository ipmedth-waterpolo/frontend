/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

//API
import { apiService } from "./services/apiService";

const app = createApp(App);

registerPlugins(app);

app.provide("apiService", apiService);

app.mount("#app");
