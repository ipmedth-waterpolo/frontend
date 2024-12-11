<script setup lang="ts">
defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-card-item>
    <v-container class="pa-0">
      <v-row dense>
        <!-- Icons in a compact layout -->
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon class="mr-2" icon="mdi-account-group" />
          {{ exercise.minimum_aantal_spelers }}
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon v-if="exercise.water_nodig" color="red" class="mr-2" icon="mdi-water-off-outline" />
          <v-icon v-else color="blue" class="mr-2" icon="mdi-water-outline" />
        </v-col>

        <!-- Row 2: Other icons -->
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon color="blue" class="mr-2" icon="mdi-water-outline" />
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon class="mr-2" icon="mdi-timer-sand" />
          {{ exercise.duur }}
        </v-col>
      </v-row>
    </v-container>
  </v-card-item>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
