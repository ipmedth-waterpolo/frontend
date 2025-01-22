<script setup lang="ts">

import useUserData from "@/composable/useUserData";

const {userData, callAndSetUserData, isAdmin} = useUserData();
callAndSetUserData();

const adminUrl = import.meta.env.VITE_ADMIN_URL + '/login';

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.clear();
  window.location.href = '/';
}


</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ userData.username }}</v-card-title>
      <v-card-text>
        <p>E-mail: {{ userData.userEmail }}</p>
        <p>Jouw rol: {{ userData.userRole }}</p>
      </v-card-text>
    </v-card>
    <v-btn
      @click="logout"
      color="error"
      class="ma-4"
    >Uitloggen
    </v-btn>
    <v-btn
      v-if="isAdmin"
      :href="adminUrl"
      color="primary"
      class="ma-4"
    >Ga naar admin pagina
    </v-btn>
  </v-container>

</template>

<style scoped>

</style>
