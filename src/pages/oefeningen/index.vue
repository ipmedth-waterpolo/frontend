<script setup lang="ts">
import PageContent from "@/components/PageContent.vue";
import {useExercises} from "@/api/composable/useExercises";
import {onMounted} from "vue";
import ExerciseCategoryFilter from "@/components/exerciseComponents/ExerciseCategoryFilter.vue";

const {exercises, error, fetchExercises} = useExercises();

onMounted(() => {
  fetchExercises();
});
</script>

<template>
  <PageContent>
    <div v-if="error">error retrieving exercises</div>
    <ExerciseCategoryFilter v-else :exercises/>
    <!--    <ExerciseFiltering :exercises="exercises" />-->
  </PageContent>
</template>

<style scoped></style>
