# Waterpolo Planner

Dit is de front-end van de Waterpolo Planner, gemaakt door studenten van de Hogeschool Leiden in opdracht van waterpolovereniging ZVL-1886.

## Installatie

### Requirements

- Zorg dat je NodeJS en npm op je machine hebt. Gebruik een package manager of zie de volgende links:
  - [NodeJS](https://nodejs.org/en/download/)
  - [npm](https://www.npmjs.com/get-npm)
- Als je wil uploaden naar de server, gebruik dan een FTP-client, zoals [FileZilla](https://filezilla-project.org/) of simpelweg Windows Explorer.

### Lokale development

1. Clone de repo en navigeer naar de root van het project: 
```sh
git clone git@github.com:ipmedth-waterpolo/frontend.git
cd frontend
```
2. Installeer de dependencies: 
```sh
npm install
```
3. Zorg ook dat je het .env.example bestand kopieert naar .env:
```sh
cp .env.example .env
```
- (Je kunt het bestand ook gewoon kopieren via je IDE/code editor)
4. Bekijk de .env bestand en vul de gegevens in die je nodig hebt.
   - Zorg dat de VITE_BASE_URL op het adres van je backend staat met '/api'
   - Zorg dat de VITE_BACKEND_URL op het adres van je backend staat met '/admin'
   - Zorg dat de VITE_API_KEY overeenkomt met de API key van je backend


5. Draai lokaal een development server:
```sh
npm run dev
```
De terminal laat zien waar de applicatie bereikbaar is. Zorg ook dat de backend draait, zie hiervoor de instructies bij de backend.

## Bouwen
Instructies om de applicatie te bouwen zodat je het kan uploaden naar de server:
1. Check of er geen typescript errors zijn:
```sh
npm run type-check
```
2. Build de applicatie:
```sh
npm run build
```
- Hier komt een /assets directory uit. 
3. Gebruik een FTP client om de bestanden naar de server te uploaden. Het mapje 'assets' zit in de root van de server.


## Resources
Voor dit project is het Vue framework gebruikt met het Vuetify metaframework. Het Unplugin Vue Router plugin is gebruikt om de routing te verwerken.
- [Vue](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Unplugin Vue Router](https://uvr.esm.is)
Iconen zijn hier te vinden:
- [Pictogrammers, MDI](https://pictogrammers.com/library/mdi/)
    - Gebruik deze met mdi- prefix in een v-icon tag, of check de Vuetify documentatie voor andere manieren. Voorbeeld:
    ```html
    <v-icon icon="mdi-account-heart"></v-icon>
    ```




De standaard README van Vuetify wordt hieronder geplaatst voor volledigheid:
## Vuetify (Default)

This is the official scaffolding tool for Vuetify, designed to give you a head start in building your new Vuetify application. It sets up a base template with all the necessary configurations and standard directory structure, enabling you to begin development without the hassle of setting up the project from scratch.

### ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

### 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.

### ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- 💻 **Enhanced Development Experience**: Benefit from TypeScript's static type checking and the ESLint plugin suite for Vue, ensuring code quality and consistency. [TypeScript](https://www.typescriptlang.org/) | [ESLint Plugin Vue](https://eslint.vuejs.org/)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- 🛠️ **Strongly-Typed Vue**: Use vue-tsc for type-checking your Vue components, and enjoy a robust development experience. [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

### 💡 Usage

This section covers how to start the development server and build your project for production.

#### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

#### Building for Production

To build your project for production, use:

```bash
yarn build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

### 💪 Support Vuetify Development

This project is built with [Vuetify](https://vuetifyjs.com/en/), a UI Library with a comprehensive collection of Vue components. Vuetify is an MIT licensed Open Source project that has been made possible due to the generous contributions by our [sponsors and backers](https://vuetifyjs.com/introduction/sponsors-and-backers/). If you are interested in supporting this project, please consider:

- [Requesting Enterprise Support](https://support.vuetifyjs.com/)
- [Sponsoring John on Github](https://github.com/users/johnleider/sponsorship)
- [Sponsoring Kael on Github](https://github.com/users/kaelwd/sponsorship)
- [Supporting the team on Open Collective](https://opencollective.com/vuetify)
- [Becoming a sponsor on Patreon](https://www.patreon.com/vuetify)
- [Becoming a subscriber on Tidelift](https://tidelift.com/subscription/npm/vuetify)
- [Making a one-time donation with Paypal](https://paypal.me/vuetify)

### 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC
