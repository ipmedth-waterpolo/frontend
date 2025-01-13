<template>
  <v-app>
    <login v-if="!loggedIn" @loginSuccess="onLoginSuccess"/>

    <RouterNav
      v-if="loggedIn"
      :items="allRouteItems"
    />
  </v-app>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import RouterNav from "@/RouterNav.vue";
import Login from "@/pages/login.vue";

const token = ref(localStorage.getItem('authToken'));
const loggedIn = computed(() => token.value !== null);

function onLoginSuccess(newToken: string) {
  token.value = newToken;
  localStorage.setItem('authToken', newToken);
}

const allRouteItems = [
  {title: 'Home', to: '/'},
  {title: 'Training maken', to: '/oefeningen'},
  {title: 'Mijn Trainingen', to: '/mijn-trainingen'},
  {title: 'Alle Trainingen', to: '/alle-trainingen'},
  {title: 'About', to: '/about'},
  {title: 'Account', to: '/account'},
];
</script>
