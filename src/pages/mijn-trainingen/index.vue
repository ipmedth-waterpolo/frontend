<script setup lang="ts">
import TrainingList from "@/components/trainingComponents/TrainingList.vue";
import { useTrainings } from "@/api/composable/useTrainings";
import { computed, onMounted } from "vue";

const { trainings, error, fetchTrainings } = useTrainings();

const userID = localStorage.getItem("userID");

onMounted(() => {
  fetchTrainings();
});

const myTrainings = computed(() => {
  return trainings.value.filter((training) => training.userID === userID);
});
</script>


<template>
    <TrainingList :trainings="myTrainings"/>

</template>

<style scoped>

</style>
