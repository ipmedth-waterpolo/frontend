<script setup lang="ts">
import ExerciseVisual from "@/components/exerciseComponents/ExerciseVisual.vue";

defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <v-card class="ma-0" density="comfortable"
          @click="$router.push({ path: `/oefeningen/${exercise.id}` })"
  >
    <v-container class="pa-0">
      <v-row align="center">
        <!-- Card Title -->
        <v-col cols="10">
          <v-card-title class="text-start">
            {{ exercise.name }}
          </v-card-title>
        </v-col>

        <!-- Exercise Visual -->
        <v-col cols="2" class="d-flex justify-end">
          <ExerciseVisual :exercise="exercise"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<style scoped>
/* Add any custom styles here */
</style>
