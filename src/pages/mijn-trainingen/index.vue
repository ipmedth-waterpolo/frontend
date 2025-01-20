<script setup lang="ts">
import TrainingList from "@/components/trainingComponents/TrainingList.vue";
import { useTrainings } from "@/api/composable/useTrainings";
import useUserData from "@/useUserData";
import {computed, onMounted} from "vue";

const {userData} = useUserData();
const { trainings, error, fetchTrainings } = useTrainings();

const userID = userData.value.userID.toString();

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
