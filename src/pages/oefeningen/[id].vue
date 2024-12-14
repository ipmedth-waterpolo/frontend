<script setup lang="ts">
import ExerciseDetail from "@/components/exerciseComponents/ExerciseDetail.vue";
import { useExercises } from "@/composable/useExercises";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const { exercise, error, fetchExerciseById } = useExercises();
const route = useRoute();

onMounted(() => {
  const exerciseId = route.params.id as string;
  fetchExerciseById(exerciseId);
});
</script>

<template>
  <div v-if="exercise">
    <ExerciseDetail :exercise="exercise" />
  </div>
</template>

<style scoped></style>
