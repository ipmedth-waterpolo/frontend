<script setup lang="ts">
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";

defineProps({
  training: {
    type: Object,
    required: true,
  },
});

const getStarClass = (index: number, rating: number) => {
  return index < rating ? 'fas fa-star' : 'far fa-star';
};
</script>

<template>
  <v-card class="ma-3">
    <v-card-title class="d-flex align-center">
      <!-- Pijl links naast de titel -->
      <v-btn
        icon
        class="back-button mr-3"
        @click="$router.push({ path: '/mijn-trainingen' })"
      >
        <v-icon color="white">mdi-arrow-left</v-icon>
      </v-btn>
      
      <!-- Training Name -->
      <span>{{ training.name }}</span>
    </v-card-title>

    <!-- Description -->
    <v-card-text>
      <p class="description"><strong>Description:</strong> {{ training.beschrijving }}</p>

      <!-- Total Duration -->
      <p class="duration"><strong>Total Duration:</strong> {{ training.totale_duur }} minutes</p>

      <!-- Exercises -->
      <div v-if="training.oefeningen">
        <ExerciseList :exercises="training.oefeningen" />
      </div>
    </v-card-text>

    <!-- Rating -->
    <v-card-subtitle>
      <p class="rating_tekst"><strong>Rating:</strong></p>
      <div class="rating">
        <i
          v-for="index in 5"
          :key="index"
          :class="getStarClass(index, training.ratings)"
        ></i>
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<style scoped>
.rating {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  margin-left: 30px;
}

.rating_tekst, .description{
  margin-left: 30px;
}

.fas.fa-star {
  color: #ffc107; /* Gold color for filled stars */
}

.far.fa-star {
  color: #e4e5e9; /* Grey color for empty stars */
}

.duration {
  margin-top: 5px;
  margin-left: 30px;
}

/* Stijlen voor de pijlknop */
.back-button {
  font-size: 15px; /* Grootte van het icoon */
  color: rgb(255, 255, 255);
  width: 25px;
  height: 25px;
  margin-left: -9px;
}
</style>
