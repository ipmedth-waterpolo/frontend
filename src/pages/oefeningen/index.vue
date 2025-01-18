<script setup lang="ts">
import {useExercises} from "@/api/composable/useExercises";
import {useSelectedExercises} from "@/components/exerciseComponents/useSelectedExercises";
import {onMounted} from "vue";
import ExerciseCategoryFilter from "@/components/exerciseComponents/ExerciseCategoryFilter.vue";

const {exercises, error, fetchExercises} = useExercises();
const {selectedExerciseIDs, toggleExerciseSelection} = useSelectedExercises();

onMounted(() => {
  fetchExercises();
});

</script>

<template>
  <div v-if="error">error retrieving exercises</div>
  <ExerciseCategoryFilter v-else :exercises/>

  <!-- Conditionally Render Banner -->
  <v-banner
    v-if="selectedExerciseIDs.length > 0"
    class="justify-center position-fixed bottom-0 left-0 right-0"
    bg-color="primary"
    variant="tonal"
    single-line
    density="compact"
  >
    <v-banner-text class="text-h6 font-weight-bold">
      <v-icon icon="mdi-basket-outline"/>
      {{ selectedExerciseIDs.length }}
    </v-banner-text>
    <v-btn color="white" base-color="white" variant="text" @click="$router.push('/oefeningen/training-maken')">
      Verder
      <v-icon icon="mdi-arrow-right"/>
    </v-btn>
  </v-banner>

</template>

<style scoped></style>
