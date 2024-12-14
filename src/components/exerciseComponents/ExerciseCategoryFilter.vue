<script setup lang="ts">
import {ref, computed} from "vue";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import ExerciseFiltering from "@/components/exerciseComponents/ExerciseFiltering.vue";

const props = defineProps({
  exercises: {
    type: Array,
    required: true,
  },
});

const filters = ref({
  categorie: "",
})

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

const cards = ref(new Array(8).fill(null));

const filteredExercises = computed(() => {
  return props.exercises.filter(exercise => {
    return (
      (filters.value.categorie === "" ||
        exercise.categorie.includes(filters.value.categorie))
    );
  });
});
</script>


<template>
  <v-container v-if="filters.categorie === ''">
    <v-row>
      <v-col
        v-for="(option, index) in categorieOptions"
        :key="index"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card >
          <v-card-title>{{ option.label }}</v-card-title>

          <v-card-text>
            hoi
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>

<!--  <ExerciseFiltering v-else exercises="filteredExercises" />-->

</template>

<!--<v-select-->
<!--  v-model="filters.categorie"-->
<!--  :items="categorieOptions"-->
<!--  item-value="value"-->
<!--  item-title="label"-->
<!--  label="Categorie"-->
<!--&gt;</v-select>-->


<style scoped>

</style>
