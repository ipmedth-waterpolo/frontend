<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import TrainingDetail from "@/components/trainingComponents/TrainingDetail.vue";
import {useTrainings} from "@/api/composable/useTrainings";

const { training, error, fetchTrainingById } = useTrainings();
const route = useRoute();

onMounted(() => {
  const trainingId = route.params.id as string;
  fetchTrainingById(trainingId);
});
</script>

<template>
  <div v-if="training">
    <TrainingDetail :training="training" />
  </div>
</template>

<style scoped></style>
