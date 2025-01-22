<template>
  <v-app>
    <login v-if="!loggedIn" @loginSuccess="onLoginSuccess"/>

    <RouterNav
      v-if="loggedIn"
      :items="filteredRouteItems"
    />
  </v-app>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import RouterNav from "@/RouterNav.vue";
import Login from "@/components/Login.vue";
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import useUserData from "@/composable/useUserData";

const {callAndSetUserData, isAdminOrTrainer} = useUserData();

const token = ref(localStorage.getItem('authToken'));
const loggedIn = computed(() => token.value !== null);

if (loggedIn.value) {
  callAndSetUserData();
}

const showAllRoutes = computed(() => {
  return isAdminOrTrainer.value;
});

const allRouteItems = [
  {title: 'Home', to: '/', appBarTitle: 'Waterpolo Planner'},
  {title: 'Mijn Trainingen', to: '/mijn-trainingen', appBarTitle: 'Mijn Trainingen'},
  {title: 'Training maken', to: '/training-maken', appBarTitle: 'Training maken'},
  {title: 'Andere Trainingen', to: '/trainingen', appBarTitle: 'Trainingen'},
  {title: 'Oefeningen overzicht', to: '/oefeningen', appBarTitle: 'Oefeningen'},
  {title: 'Oefening maken', to: '/oefening-maken', appBarTitle: 'Oefening maken'},
  {title: 'Over ons', to: '/about', appBarTitle: 'Over Ons'},
  {title: 'Account', to: '/account', appBarTitle: 'Account'},
];

const filteredRouteItems = computed(() => {
  if (showAllRoutes.value) {
    return allRouteItems;
  } else {

    return allRouteItems.filter(
      item => item.to !== '/oefening-maken' && item.to !== '/mijn-trainingen' && item.to !== '/training-maken'
    );
  }
});


function onLoginSuccess(newToken: string) {
  token.value = newToken;
  localStorage.setItem('authToken', newToken);
}
</script>
