<script setup lang="ts">
import PageContent from "@/components/PageContent.vue";
import ExerciseFiltering from "@/components/exerciseComponents/ExerciseFiltering.vue";
import { useExercises } from "@/composable/useExercises";
import { onMounted } from "vue";
import ExerciseCategoryFilter from "@/components/exerciseComponents/ExerciseCategoryFilter.vue";
import ExerciseFiltering from "@/components/exerciseComponents/ExerciseFiltering.vue";

const { exercises, error, fetchExercises } = useExercises();

onMounted(() => {
  fetchExercises();
});
</script>

<template>
  <PageContent>
    <div v-if="error">error retrieving exercises</div>
    <ExerciseCategoryFilter v-else :exercises />
  </PageContent>
</template>

<style scoped></style>
