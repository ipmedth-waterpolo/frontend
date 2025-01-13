<script setup lang="ts">
import type {trainingDao} from "@/api/dao/training_dao";
import Training from "@/components/trainingComponents/Training.vue";

defineProps<{
  trainings: trainingDao[];
}>();
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
        <Training :training/>
      </v-col>
    </v-row>
  </v-container>
  <v-card v-if="trainings.length === 0"> Geen trainingen gemaakt</v-card>
  <!--    hier mss direct linkje naar training aanmaken-->
</template>

<style scoped></style>
