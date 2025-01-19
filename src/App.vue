<template>
  <v-app>
    <login v-if="!loggedIn" @loginSuccess="onLoginSuccess" />

    <RouterNav
      v-if="loggedIn"
      :items="filteredRouteItems"
    />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import RouterNav from "@/RouterNav.vue";
import Login from "@/components/Login.vue";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const userRole = ref(localStorage.getItem('userRole'));
const token = ref(localStorage.getItem('authToken'));
const loggedIn = computed(() => token.value !== null);

const showAllRoutes = computed(() => {
  return userRole.value === 'admin' || userRole.value === 'trainer';
});

const allRouteItems = [
  { title: 'Home', to: '/', appBarTitle: 'Waterpolo Planner' },
  { title: 'Mijn Trainingen', to: '/mijn-trainingen', appBarTitle: 'Mijn Trainingen' },
  { title: 'Training maken', to: '/oefeningen', appBarTitle: 'Training maken' },
  { title: 'Andere Trainingen', to: '/alle-trainingen', appBarTitle: 'Trainingen' },
  { title: 'Oefening maken', to: '/oefening-maken', appBarTitle: 'Oefening maken' },
  { title: 'Account', to: '/account', appBarTitle: 'Account' },
  { title: 'Over ons', to: '/about', appBarTitle: 'Over Ons' },
];

const filteredRouteItems = computed(() => {
  if (showAllRoutes.value) {
    return allRouteItems;
  } else {
    // Exclude specific routes for non-admin and non-trainer users
    return allRouteItems.filter(
      item => item.to !== '/oefening-maken' && item.to !== '/mijn-trainingen'
    );
  }
});


function onLoginSuccess(newToken: string) {
  token.value = newToken;
  localStorage.setItem('authToken', newToken);
}
</script>
