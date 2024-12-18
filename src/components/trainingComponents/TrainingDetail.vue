<script setup lang="ts">
defineProps({
  training: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <v-card class="ma-3">
    <!-- Training Name -->
    <v-card-title>{{ training.name }}</v-card-title>

    <!-- Subtitle Section -->
    <v-card-subtitle>
      <p><strong>Status:</strong> {{ training.enabled ? "Enabled" : "Disabled" }}</p>
      <p><strong>User ID:</strong> {{ training.userID }}</p>
      <p v-if="training.ratings !== null">
        <strong>Rating:</strong> {{ training.ratings }} / 5
      </p>
    </v-card-subtitle>

    <!-- Description -->
    <v-card-text>
      <p><strong>Description:</strong> {{ training.beschrijving }}</p>

      <!-- Exercises -->
      <p v-if="training.oefeningIDs && JSON.parse(training.oefeningIDs).length">
        <strong>Exercises:</strong>
        {{ JSON.parse(training.oefeningIDs).join(", ") }}
      </p>

      <!-- Total Duration -->
      <p><strong>Total Duration:</strong> {{ training.totale_duur }} minutes</p>
    </v-card-text>

  </v-card>
</template>

<style scoped>

</style>
