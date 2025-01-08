<script setup lang="ts">

function logout() {
  localStorage.removeItem('authToken');
  window.location.href = '/';
}

</script>

<template>

  <button @click="logout">Uitloggen</button>

</template>

<style scoped>

</style>
