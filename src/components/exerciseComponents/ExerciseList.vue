<script setup lang="ts">
import Exercise from "@/components/exerciseComponents/Exercise.vue";

defineProps({
  exercises: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="exercise in exercises"
        :key="exercise.id"
        cols="12"
        sm="12"
        md="6"
        lg="4"
      >
        <Exercise :exercise/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Add any custom styles here */
</style>

