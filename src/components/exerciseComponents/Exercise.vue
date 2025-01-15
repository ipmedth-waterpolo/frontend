<script setup lang="ts">
import ExerciseVisual from "@/components/exerciseComponents/ExerciseVisual.vue";

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-card class="ma-3 pa-3" @click="$router.push({ path: `/oefeningen/${exercise.id}` })">
    <v-container class="pa-0">
      <v-row dense>
        <!-- Naam van de oefening -->
        <v-col
          cols="12"
          class="d-flex align-start mb-3"
        >
          <h4 class="text-start">{{ exercise.name }}</h4>
        </v-col>

        <!-- Iconen en teksten -->
        <v-col
          cols="12"
          class="d-flex flex-column flex-md-row align-start align-md-center"
        >
          <!-- Spelers -->
          <div class="d-flex align-center mr-md-5 mb-2 mb-md-0">
            <v-icon class="mr-2" icon="mdi-account-group" />
            <span>{{ exercise.minimum_aantal_spelers }}</span>
          </div>

          <!-- Water Nodig -->
          <div class="d-flex align-center mr-md-5 mb-2 mb-md-0">
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
            <v-icon class="mr-2" icon="mdi-timer-sand" />
            <span>{{ exercise.duur }} minuten</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>
/* Standaard grootte van iconen */
.v-icon {
  font-size: 20px;
}

/* Zorg voor ruimte tussen elementen */
.v-col > div {
  display: flex;
  align-items: center;
}

.text-start{
  font-size: 20px;
}
</style>
