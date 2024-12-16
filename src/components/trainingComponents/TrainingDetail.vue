<script setup lang="ts">
defineProps({
  training: {
    type: Object,
    required: true,
  },
})

// Handlers for actions (these can be connected to navigation or modals)
const viewTraining = () => {
  console.log("Viewing training...");
  // Implement navigation or modal logic here
};

const editTraining = () => {
  console.log("Editing training...");
  // Implement navigation or modal logic here
};

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

    <!-- Actions -->
    <v-card-actions>
      <v-btn color="primary" @click="viewTraining">View Training</v-btn>
      <v-btn color="secondary" @click="editTraining">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
