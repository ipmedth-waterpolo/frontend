<script setup lang="ts">
import PageContent from "@/components/PageContent.vue";
import { computed, onMounted, ref } from "vue";
import { useExercises } from "@/api/composable/useExercises";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";

const { exercises, error, fetchExercises } = useExercises();

const selectedExerciseIDs = ref<number[]>(
  JSON.parse(localStorage.getItem("selectedExerciseIDs") || "[]") // Load from localStorage
);

// Fetch exercises when the component is mounted
onMounted(() => {
  fetchExercises();
});

// Filter selected exercises based on selected IDs
const selectedExercises = computed(() => {
  return exercises.value.filter((exercise) =>
    selectedExerciseIDs.value.includes(parseInt(exercise.id))
  );
});
</script>
<template>
  <PageContent>
    <v-card class="ma-3">
      <v-card-title>Training aanmaken</v-card-title>
    </v-card>
    selected exercises: {{ selectedExerciseIDs }}

    <!-- Display exercises if available -->
    <ExerciseList
      v-if="exercises && exercises.length > 0"
      :exercises="selectedExercises"
    />

    <!-- Display an error if one occurred -->
    <v-alert v-if="error" type="error">
      Fout bij het laden van oefeningen: {{ error }}
    </v-alert>

  </PageContent>
</template>
