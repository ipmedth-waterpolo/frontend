<script setup lang="ts">
defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-card
    @click="$router.push({ path: `/oefeningen/${exercise.id}` })"
  >
    <!-- Title -->
    <v-card-title>
      {{ exercise.name }}
    </v-card-title>

    <v-card-text>
      <v-row dense>
        <!-- Iconen en teksten -->
        <v-col
          cols="12"
          class="d-flex flex-column flex-md-row align-start align-md-center"
        >
          <!-- Spelers -->
          <div class="d-flex align-center mr-md-5 mb-2 mb-md-0 pr-4">
            <v-icon class="mr-2" icon="mdi-account-group"/>
            <span>{{ exercise.minimum_aantal_spelers }}</span>
          </div>

          <!-- Water Nodig -->
          <div class="d-flex align-center mr-md-5 mb-2 mb-md-0 pr-4">
            <v-icon
              class="mr-2"
              :icon="exercise.water_nodig ? 'mdi-water-outline' : 'mdi-water-off-outline'"
              :color="exercise.water_nodig ? 'blue' : 'red'"
            />
            <span>
                {{ exercise.water_nodig ? 'Water nodig' : 'Geen water nodig' }}
              </span>
          </div>

          <!-- Duur -->
          <div class="d-flex align-center">
            <v-icon class="mr-2" icon="mdi-timer-sand"/>
            <span>{{ exercise.duur }} minuten</span>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
