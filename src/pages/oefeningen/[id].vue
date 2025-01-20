<script setup lang="ts">
import ExerciseDetail from "@/components/exerciseComponents/ExerciseDetail.vue";
import {useExercises} from "@/api/composable/useExercises";
import useUserData from "@/useRoles";
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";

const {exercise, error, fetchExerciseById, deleteExerciseById} = useExercises();
const route = useRoute();
const router = useRouter();
const {isAdmin} = useUserData();


onMounted(() => {
  const exerciseId = route.params.id as string;
  fetchExerciseById(exerciseId);
});
</script>

<template>
  <div v-if="exercise">
    <ExerciseDetail :exercise="exercise"/>
    <v-btn
      v-if="isAdmin"
      color="error"
      class="ma-3"
      @click="deleteExerciseById(exercise.id).then(() => router.back())"
    >Verwijder Oefening (let op: gebeurt meteen)
    </v-btn>
  </div>
</template>

<style scoped></style>
