<script setup lang="ts">
defineProps({
  exercise: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <v-card class="ma-3">
    <v-img
      v-if="exercise.afbeeldingen"
      :src="JSON.parse(exercise.afbeeldingen).url"
      aspect-ratio="16/9"
    />

    <v-card-title>{{ exercise.name }}</v-card-title>

    <v-card-subtitle>
      Categories: {{ JSON.parse(exercise.categorie).join(", ") }}
    </v-card-subtitle>

    <v-card-text>
      <p><strong>Description:</strong> {{ exercise.omschrijving }}</p>
      <p><strong>Age Group:</strong> {{ JSON.parse(exercise.leeftijdsgroep).join(", ") }}</p>
      <p><strong>Duration:</strong> {{ exercise.duur }} minutes</p>
      <p><strong>Min. Players:</strong> {{ exercise.minimum_aantal_spelers }}</p>
      <p><strong>Requirements:</strong> {{ JSON.parse(exercise.benodigdheden).join(", ") }}</p>
      <p><strong>Water Needed:</strong> {{ exercise.water_nodig ? "Yes" : "No" }}</p>
      <v-btn
        v-if="exercise.source"
        :href="exercise.source"
        target="_blank"
        color="primary"
        class="mt-3"
      >
        View Source
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style scoped>
/* Add any custom styles here */
</style>
