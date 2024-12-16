<script setup lang="ts">
import ExerciseDetail from "@/components/exerciseComponents/ExerciseDetail.vue";
import { useExercises } from "@/api/composable/useExercises";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const { exercise, error, fetchExerciseById, deleteExerciseById } =
  useExercises();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  const exerciseId = route.params.id as string;
  fetchExerciseById(exerciseId);
});
</script>

<template>
  <div v-if="exercise">
    <ExerciseDetail :exercise="exercise" />
    <button @click="deleteExerciseById(exercise.id).then(() => router.back())">
      Verwijder oefening
    </button>
  </div>
</template>

<style scoped></style>
