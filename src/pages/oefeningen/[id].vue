<script setup lang="ts">
import ExerciseDetail from "@/components/exerciseComponents/ExerciseDetail.vue";
import {useExercises} from "@/composable/useExercises";

const {exercises, error} = useExercises();

defineProps({
  exercise: {
    type: Object,
    required: true,
  }
})


</script>

<template>
  <div v-for="exercise in exercises">
    <div v-if="exercise.id == $route.params.id">
      <ExerciseDetail :exercise/>
    </div>
  </div>

</template>

<style scoped>

</style>
