<script setup lang="ts">
import {ref, computed, watch} from "vue";
import ExerciseFiltering from "@/components/exerciseComponents/ExerciseFiltering.vue";
import {useRoute, useRouter} from "vue-router";

// Router instances
const route = useRoute();
const router = useRouter();

// Filters state
const filters = ref({
  categorie: route.query.categorie || "", // Initialize from query
});

// Props for exercises
const props = defineProps({
  exercises: {
    type: Array,
    required: true,
  },
});

// Category options
const categorieOptions = [
  {label: "Alle Categorieën", value: "alle"},
  {label: "Warming Up", value: "warming-up"},
  {label: "Techniek", value: "techniek"},
  {label: "Tactiek", value: "tactiek"},
  {label: "Conditie", value: "conditie"},
  {label: "Cooling Down", value: "cooling-down"},
  {label: "Keeper", value: "keeper"},
  {label: "Theorie", value: "theorie"},
];

// Filter exercises based on category
const filteredExercises = computed(() => {
  return props.exercises.filter((exercise) => {
    return (
      filters.value.categorie === "" ||
      filters.value.categorie === "alle" ||
      exercise.categorie.includes(filters.value.categorie)
    );
  });
});

const setLabel = (categorie: string) => {
  const option = categorieOptions.find((option) => option.value === categorie);
  return option ? option.label : categorie;
}

// Watch for changes in route query and update filters
watch(
  () => route.query.categorie,
  (newCategorie) => {
    filters.value.categorie = newCategorie || "";
  }
);

// Navigate to a new category
const navigateToCategory = (categorie: string) => {
  router.push({path: "/oefeningen", query: {categorie}});
};

</script>

<template>
  <!-- Category Selection -->
  <v-container v-if="filters.categorie === ''">
    <v-row>
      <v-col
        v-for="(option, index) in categorieOptions"
        :key="index"
        cols="6"
      >
        <v-card
          min-height="120"
          :color="index === 0 ? 'blue-darken-3' : undefined"
          @click="navigateToCategory(option.value)"
        >
          <v-card-title class="text-center text-h6 text-wrap">{{ setLabel(option.value) }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>


  <div v-else>
    <!-- Filtered Exercises -->
    <v-container>
      <v-card>
        <v-card-title class="text-center text-wrap">Selectie: {{ setLabel(filters.categorie) }}</v-card-title>

        <v-card-actions class="d-flex justify-center">
          <v-btn @click="router.push('/oefeningen')">Andere categorie kiezen</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <ExerciseFiltering :exercises="filteredExercises"/>
  </div>
</template>

<style scoped>

</style>
