<script setup lang="ts">
import {useExercises} from "@/api/composable/useExercises";
import {onMounted} from "vue";
import ExerciseOverview from "@/components/exerciseComponents/ExerciseOverview.vue";

const {exercises, error, fetchExercises} = useExercises();
onMounted(() => {
  fetchExercises();
});


</script>

<template>
  <div v-if="error">error retrieving exercises</div>
  <ExerciseOverview v-else :exercises :is-create-training-mode="true"/>

</template>

<style scoped></style>
