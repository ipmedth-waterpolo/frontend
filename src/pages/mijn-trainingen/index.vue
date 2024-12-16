<script setup lang="ts">
import PageContent from "@/components/PageContent.vue";
import TrainingList from "@/components/trainingComponents/TrainingList.vue";
import {useTrainings} from "@/api/composable/useTrainings";
import {onMounted} from "vue";

const {trainings, error, fetchTrainings} = useTrainings();

onMounted(() => {
  fetchTrainings();
});

</script>

<template>
  <PageContent>
    <TrainingList :trainings/>

  </PageContent>
</template>

<style scoped>

</style>
