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
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const token = ref(localStorage.getItem('authToken'));
const loggedIn = computed(() => token.value !== null);

function onLoginSuccess(newToken: string) {
  token.value = newToken;
  localStorage.setItem('authToken', newToken);
}

const allRouteItems = [
  {title: 'Home', to: '/', appBarTitle: 'Waterpolo Planner'},
  {title: 'Mijn Trainingen', to: '/mijn-trainingen', appBarTitle: 'Mijn Trainingen'},
  {title: 'Training maken', to: '/oefeningen', appBarTitle: 'Training maken'},
  {title: 'Andere Trainingen', to: '/alle-trainingen', appBarTitle: 'Trainingen'},
  {title: 'Oefening maken', to: '/oefening-maken', appBarTitle: 'Oefening maken'},
  {title: 'Account', to: '/account', appBarTitle: 'Account'},
  {title: 'Over ons', to: '/about', appBarTitle: 'Over Ons'},
];
</script>
