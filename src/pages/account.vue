<script setup lang="ts">

function logout() {
  localStorage.removeItem('authToken');
  localStorage.clear();
  window.location.href = '/';
}

const userData = () => {
  const username = localStorage.getItem('username');
  const userID = localStorage.getItem('userID');
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');
  return {username, userID, userEmail, userRole};
}

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>{{ userData().username }}</v-card-title>
      <v-card-text>
        <p>E-mail: {{ userData().userEmail }}</p>
        <p>Jouw rol: {{ userData().userRole }}</p>
      </v-card-text>
    </v-card>
    <v-btn
      @click="logout"
      color="error"
      class="mx-auto my-4"
    >Uitloggen
    </v-btn>
  </v-container>

</template>

<style scoped>

</style>
