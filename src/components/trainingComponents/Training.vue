<!--training list item-->
<script setup lang="ts">
defineProps({
  training: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <v-card class="ma-3" @click="$router.push({ path: `/mijn-trainingen/${training.id}` })">
    <!-- Training Name -->
    <v-card-title>{{ training.name }}</v-card-title>

    <!-- Subtitle Section -->
    <v-card-subtitle>
      <p v-if="training.ratings !== null">
        <strong>Rating:</strong> {{ training.ratings }} / 5
      </p>
    </v-card-subtitle>

    <!-- Description -->
    <v-card-text>
      <p><strong>Description:</strong> {{ training.beschrijving }}</p>

      <!-- Total Duration -->
      <p><strong>Total Duration:</strong> {{ training.totale_duur }} minutes</p>
    </v-card-text>

  </v-card>
</template>

<style scoped>

</style>
