<script setup lang="ts">
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";

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


      <!-- Total Duration -->
      <p><strong>Total Duration:</strong> {{ training.totale_duur }} minutes</p>

      <!-- Exercises -->
      <div v-if="training.oefeningen">
<!--        {{training.oefeningen}}-->
        <ExerciseList :exercises="training.oefeningen" />
      </div>
    </v-card-text>

  </v-card>
</template>

<style scoped>

</style>
