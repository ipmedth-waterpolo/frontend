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
  duur: [0, 240],
  minimumAantalSpelers: [0, 20],
  waterNodig: "",
});

const waterNodigOptions = [
  {label: "Maakt niet uit", value: ""},
  {label: "Ja", value: 1},
  {label: "Nee", value: 0},
];

const leeftijdsgroepOptions = [
  {label: "Alle Leeftijdsgroepen", value: ""},
  {label: "Onder de 6", value: "O6"},
  {label: "Onder de 8", value: "O8"},
  {label: "Onder de 10", value: "O10"},
  {label: "Onder de 12", value: "O12"},
  {label: "Onder de 14", value: "O14"},
  {label: "Onder de 16", value: "O16"},
  {label: "Onder de 18", value: "O18"},
]

// Filtered Exercises
const filteredExercises = computed(() => {
  return props.exercises.filter(exercise => {
    return (
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
<!--    <v-row>-->
      <!-- Filters Section -->

<!--      <v-col cols="12">-->
        <v-expansion-panels>
          <v-expansion-panel title="Filters">
            <v-expansion-panel-text>
              <v-card-text>
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
                  label="Duur in minuten"
                  step="5"
                  thumb-label="always"
                ></v-range-slider>

                <!-- Minimum Aantal Spelers Filter -->
                <v-range-slider
                  v-model="filters.minimumAantalSpelers"
                  :max="20"
                  label="Minimum aantal spelers"
                  thumb-label="always"
                  step="1"
                ></v-range-slider>
              </v-card-text>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
<!--      </v-col>-->
<!--    </v-row>-->
  </v-container>

    <ExerciseList :exercises="filteredExercises" />
</template>



<style scoped>

</style>
