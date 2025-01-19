<script setup lang="ts">
import type {trainingDao} from "@/api/dao/training_dao";
import Training from "@/components/trainingComponents/Training.vue";
import {computed, ref} from "vue";

const props = defineProps<{
  trainings: trainingDao[];
}>();

const sortOrder = ref("nieuwste");

// trainings sorteren
const displayedTrainings = computed(() => {
  switch (sortOrder.value) {
    case "nieuwste":
      return [...props.trainings].reverse(); // newest
    case "oudste":
      return props.trainings; // oldest
    case "sterren":
      return [...props.trainings].sort((a, b) => (b.ratings ?? 0) - (a.ratings ?? 0)); // ratings
    case "duur":
      return [...props.trainings].sort((a, b) => b.totale_duur - a.totale_duur); // duration
    case "alfabetisch":
      return [...props.trainings].sort((a, b) =>
        a.name.localeCompare(b.name) // alphabetical
      );
    default:
      return props.trainings; // fallback
  }
});
</script>
<template>
  <v-container max-width="900">
    <!-- Centering the v-select -->
    <div class="d-flex justify-center">
      <v-select
        max-width="450"
        v-if="trainings.length > 0"
        v-model="sortOrder"
        :items="[
          { value: 'nieuwste', text: 'Nieuwste' },
          { value: 'oudste', text: 'Oudste' },
          { value: 'sterren', text: 'Aantal sterren' },
          { value: 'duur', text: 'Duur' },
          { value: 'alfabetisch', text: 'Alfabetisch' }
        ]"
        item-value="value"
        item-title="text"
        label="Sorteer op"
        outlined
      />
    </div>

    <!-- Centering the rows of trainings -->
    <div class="d-flex flex-wrap justify-center">
      <v-row class="justify-center">
        <v-col
          v-for="training in displayedTrainings"
          :key="training.id"
          cols="12"
          sm="12"
          md="6"
        >
          <Training :training="training"/>
        </v-col>
      </v-row>
    </div>

    <!-- Empty state message -->
    <v-row class="d-flex justify-center">
      <v-card
        v-if="trainings.length === 0"
        class="d-flex justify-center mt-6 px-8"
        max-width="500"
      >
        <v-card-title>Geen trainingen gevonden</v-card-title>
      </v-card>
    </v-row>

    <!-- Button to create a new training -->
    <v-row class="d-flex justify-center">
      <v-btn
        @click="$router.push('/oefeningen')"
        class="mt-6 pa-6 justify-center align-content-center"
        color="primary"
      >
        Nieuwe training aanmaken
      </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
