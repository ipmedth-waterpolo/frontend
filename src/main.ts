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
import { apiServiceExercises } from "@/api/services/apiServiceExercises";
import { apiServiceTrainings} from "@/api/services/apiServiceTrainings";

const app = createApp(App);

registerPlugins(app);

app.provide("apiServiceExercises", apiServiceExercises);
app.provide("apiServiceTrainings", apiServiceTrainings);

app.mount("#app");
