<script setup lang="ts">
import {useExercises} from "@/api/composable/useExercises";
import {onMounted} from "vue";
import ExerciseCategoryFilter from "@/components/exerciseComponents/ExerciseCategoryFilter.vue";

const {exercises, error, fetchExercises} = useExercises();

onMounted(() => {
  fetchExercises();
});

</script>

<template>
  <div v-if="error">error retrieving exercises</div>
  <ExerciseCategoryFilter v-else :exercises/>
</template>

<style scoped></style>
