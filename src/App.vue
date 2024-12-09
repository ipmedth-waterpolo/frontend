<template>
  <v-app>
    <login v-if="!loggedIn" />

    <RouterNav
      v-if="loggedIn"
      :items="allRouteItems"
    />
  </v-app>
</template>

<script setup lang="ts">
import RouterNav from "@/RouterNav.vue";
import Login from "@/pages/login.vue";

const loggedIn = true;


const allRouteItems = [
  {title: 'Home', to: '/'},
  {title: 'Training maken', to: '/training-maken'},
  {title: 'Mijn Trainingen', to: '/mijn-trainingen'},
  {title: 'About', to: '/about'},
  {title: 'Contact', to: '/contact'},
  {title: 'Help', to: '/help'},
  {title: 'Account', to: '/account'},
]

</script>

<script lang="ts">
export default {
  data: () => ({drawer: null}),
}
</script>
