<script setup lang="ts">

import PageContent from "@/components/PageContent.vue";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import {useExercises} from "@/composable/useExercises";

const {exercises, error} = useExercises();

</script>

<template>
  <PageContent>
    <div v-if="error">error retrieving exercises</div>
    <ExerciseList v-else :exercises/>
  </PageContent>
</template>

<style scoped>

</style>
