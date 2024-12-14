<script setup lang="ts">
import {ref, computed} from "vue";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";

const props = defineProps({
  exercises: {
    type: Array,
    required: true,
  },
});

// Filter Criteria
const filters = ref({
  categorie: "",
  leeftijdsgroep: "",
  duur: [5, 240],
  minimumAantalSpelers: [2, 20],
  waterNodig: "",
});

// Dropdown Options
const categorieOptions = [
  {label: "Alle Categorieën", value: ""},
  {label: "Warming Up", value: "warming-up"},
  {label: "Techniek", value: "techniek"},
  {label: "Tactiek", value: "tactiek"},
  {label: "Conditie", value: "conditie"},
  {label: "Cooling Down", value: "cooling-down"},
  {label: "Keeper", value: "keeper"},
  {label: "Theorie", value: "theorie"},
];

const waterNodigOptions = [
  {label: "Maakt niet uit", value: ""},
  {label: "Ja", value: 1},
  {label: "Nee", value: 0},
];

const leeftijdsgroepOptions = [
  {label: "Alle Leeftijdsgroepen", value: ""},
  {label: "Onder de 6", value: "O6"},
  {label: "Onder de 7", value: "O7"},
  {label: "Onder de 8", value: "O8"},
  {label: "Onder de 9", value: "O9"},
  {label: "Onder de 10", value: "O10"},
  {label: "Onder de 11", value: "O11"},
  {label: "Onder de 12", value: "O12"},
  {label: "Onder de 13", value: "O13"},
  {label: "Onder de 14", value: "O14"},
  {label: "Onder de 15", value: "O15"},
  {label: "Onder de 16", value: "O16"},
  {label: "Onder de 17", value: "O17"},
  {label: "Onder de 18", value: "O18"},
]

// Filtered Exercises
const filteredExercises = computed(() => {
  return props.exercises.filter(exercise => {
    return (
      (filters.value.categorie === "" ||
        exercise.categorie.includes(filters.value.categorie)) &&
      (filters.value.leeftijdsgroep === "" ||
        exercise.leeftijdsgroep.includes(filters.value.leeftijdsgroep)) &&
      exercise.duur >= filters.value.duur[0] &&
      exercise.duur <= filters.value.duur[1] &&
      exercise.minimum_aantal_spelers >= filters.value.minimumAantalSpelers[0] &&
      exercise.minimum_aantal_spelers <= filters.value.minimumAantalSpelers[1] &&
      (filters.value.waterNodig === "" ||
        exercise.water_nodig === filters.value.waterNodig)
    );
  });
});
</script>


<template>


  <v-container>
    <v-row>
      <!-- Filters Section -->
      <v-col cols="12" md="3">
        <v-card color="blue">
          <v-card-title>Filters</v-card-title>
          <v-card-text>
            <!-- Categorie Filter -->
            <v-select
              v-model="filters.categorie"
              :items="categorieOptions"
              item-value="value"
              item-title="label"
              label="Categorie"
            ></v-select>

            <!-- Water Nodig Filter -->
            <v-select
              v-model="filters.waterNodig"
              :items="waterNodigOptions"
              item-value="value"
              item-title="label"
              label="Water oefening?"
            ></v-select>

            <!-- Leeftijdsgroep Filter -->
            <v-select
              v-model="filters.leeftijdsgroep"
              :items="leeftijdsgroepOptions"
              item-value="value"
              item-title="label"
              label="Leeftijdsgroep"
            ></v-select>

            <!-- Duur Filter -->
            <v-range-slider
              v-model="filters.duur"
              :max="240"
              label="Duur (minuten)"
            ></v-range-slider>

            <!-- Minimum Aantal Spelers Filter -->
            <v-range-slider
              v-model="filters.minimumAantalSpelers"
              :max="20"
              label="Minimum Aantal Spelers"
            ></v-range-slider>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>


  <ExerciseList :exercises="filteredExercises"/>

</template>


<style scoped>

</style>
