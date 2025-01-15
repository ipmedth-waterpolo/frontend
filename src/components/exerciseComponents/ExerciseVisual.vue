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
        <!-- Icons in a compact and aligned layout -->
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon class="mr-2" icon="mdi-account-group" />
          <span>{{ exercise.minimum_aantal_spelers }}</span>
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon
            v-if="exercise.water_nodig"
            color="blue"
            class="mr-2"
            icon="mdi-water-outline"
          />
          <v-icon
            v-else
            color="red"
            class="mr-2"
            icon="mdi-water-off-outline"
          />
          <span>{{ exercise.water_nodig ? "Water nodig" : "Geen water nodig" }}</span>
        </v-col>

        <!-- Row 2: Other icons -->
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon color="blue" class="mr-2" icon="mdi-water-outline" />
          <span>Water</span>
        </v-col>
        <v-col
          cols="6"
          class="d-flex align-center pa-1"
        >
          <v-icon class="mr-2" icon="mdi-timer-sand" />
          <span>{{ exercise.duur }} minuten</span>
        </v-col>
      </v-row>
    </v-container>
  </v-card-item>
</template>

<style scoped>
/* Zorgt ervoor dat de tekst netjes naast de iconen staat */
.v-icon {
  font-size: 20px;
}

.d-flex {
  display: flex;
  align-items: center;
}

.pa-1 {
  padding: 8px !important; /* Voeg ruimte toe rond de iconen */
}
</style>
