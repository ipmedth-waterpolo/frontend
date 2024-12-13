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
  <v-card class="ma-0" density="comfortable">
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
          <ExerciseVisual :exercise="exercise" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>


<style scoped>
/* Add any custom styles here */
</style>
<!--    to="/oefening/:id" ofzo voor routing? idk-->
<!--    <v-img-->
<!--      v-if="exercise.afbeeldingen"-->
<!--      :src="JSON.parse(exercise.afbeeldingen).url"-->
<!--      aspect-ratio="16/9"-->
<!--    />-->


<!--    <v-card-subtitle>-->
<!--      Categories: {{ JSON.parse(exercise.categorie).join(", ") }}-->
<!--    </v-card-subtitle>-->


<!--    <v-card-text>-->
<!--      <p><strong>Description:</strong> {{ exercise.omschrijving }}</p>-->
<!--      <p><strong>Age Group:</strong> {{ JSON.parse(exercise.leeftijdsgroep).join(", ") }}</p>-->
<!--      <p><strong>Duration:</strong> {{ exercise.duur }} minutes</p>-->
<!--      <p><strong>Min. Players:</strong> {{ exercise.minimum_aantal_spelers }}</p>-->
<!--      <p><strong>Requirements:</strong> {{ JSON.parse(exercise.benodigdheden).join(", ") }}</p>-->
<!--      <p><strong>Water Needed:</strong> {{ exercise.water_nodig ? "Yes" : "No" }}</p>-->
<!--      <v-btn-->
<!--        v-if="exercise.source"-->
<!--        :href="exercise.source"-->
<!--        target="_blank"-->
<!--        color="primary"-->
<!--        class="mt-3"-->
<!--      >-->
<!--        View Source-->
<!--      </v-btn>-->
<!--    </v-card-text>-->
