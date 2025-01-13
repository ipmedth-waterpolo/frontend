<script setup lang="ts">
import PageContent from "@/components/PageContent.vue";
import TrainingList from "@/components/trainingComponents/TrainingList.vue";
import { useTrainings } from "@/api/composable/useTrainings";
import { computed, onMounted } from "vue";

const { trainings, error, fetchTrainings } = useTrainings();

// Retrieve the userID from localStorage
const userID = localStorage.getItem("userID");

onMounted(() => {
  fetchTrainings();
});

// Filter trainings based on userID
const myTrainings = computed(() => {
  return trainings.value.filter((training) => training.userID !== userID);
});
</script>


<template>
  <PageContent>
    <TrainingList :trainings="myTrainings"/>

  </PageContent>
</template>

<style scoped>

</style>
