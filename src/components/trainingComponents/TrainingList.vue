<script setup lang="ts">
import TrainingDetail from "@/components/trainingComponents/TrainingDetail.vue";

defineProps({
  trainings: {
    type: Array,
    required: true,
  },
})

</script>

<template>
  <v-container>
    <v-row>
      <v-col
          v-for="training in trainings"
          :key="training.id"
          cols="12"
          sm="12"
          md="6"
          lg="4"
      >
        <TrainingDetail :training/>
      </v-col>
    </v-row>
  </v-container>

</template>

<style scoped>

</style>
