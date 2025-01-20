<script setup lang="ts">
import ToolbarWithBackButton from "@/components/small/ToolbarWithBackButton.vue";

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <ToolbarWithBackButton>{{ exercise.name }}</ToolbarWithBackButton>

  <v-container
    fluid
    fill-height
    class="align-content-center"
    height="100%"
    max-width="900"
  >
    <v-card>
      <!-- Image Container with Flex to center it -->
      <v-img
        v-if="exercise.afbeeldingen"
        :src="exercise.afbeeldingen.url"
        max-width="500"
        class="mx-auto"
      />

      <v-card-text>
        <div class="spaced">{{ exercise.omschrijving }}</div>

        <div class="details">
          <!-- Icon-based metadata -->
          <v-row dense>
            <v-col
              cols="12"
              class="d-flex flex-column flex-md-row align-start align-md-center"
            >
              <!-- Benodigheden (if any) -->
              <div v-if="exercise.benodigdheden" class="d-flex align-center mr-md-5 mb-2 mb-md-0 pr-4">
                <v-icon class="mr-2">mdi-cogs</v-icon>
                <span>{{ exercise.benodigdheden.join(", ") }}</span>
              </div>

              <!-- Leeftijdsgroep(en) -->
              <div class="d-flex align-center mr-md-5 mb-2 mb-md-0 pr-4">
                <v-icon class="mr-2">mdi-account-group</v-icon>
                <span>{{ exercise.leeftijdsgroep.join(", ") }}</span>
              </div>

              <!-- Duur -->
              <div class="d-flex align-center mr-md-5 mb-2 mb-md-0 pr-4">
                <v-icon class="mr-2">mdi-timer-sand</v-icon>
                <span>{{ exercise.duur }} minuten</span>
              </div>

              <!-- Min. Players -->
              <div class="d-flex align-center mr-md-5 mb-2 mb-md-0 pr-4">
                <v-icon class="mr-2">mdi-account-group</v-icon>
                <span>{{ exercise.minimum_aantal_spelers }}</span>
              </div>

              <!-- Water Needed -->
              <div class="d-flex align-center">
                <v-icon
                  class="mr-2"
                  :icon="exercise.water_nodig ? 'mdi-water-outline' : 'mdi-water-off-outline'"
                  :color="exercise.water_nodig ? 'blue' : 'red'"
                />
                <span>
                  {{ exercise.water_nodig ? 'Water nodig' : 'Geen water nodig' }}
                </span>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- Source Button -->
        <v-btn
          v-if="exercise.source"
          :href="exercise.source"
          target="_blank"
          color="primary"
          class="mt-3"
        >
          Naar oorspronkelijke bron
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.spaced {
  margin-bottom: 16px;
}

.details p {
  margin: 0 0 8px;
}

v-card {
  max-width: 900px;
  margin: auto;
}

/* Centering the image */
.mx-auto {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
