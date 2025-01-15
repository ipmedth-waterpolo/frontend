<!--training list item-->
<script setup lang="ts">
defineProps({
  training: {
    type: Object,
    required: true,
  },
})

const getStarClass = (index: number, rating: number) => {
  return index < rating ? 'fas fa-star' : 'far fa-star';
};

</script>

<template>
  <v-card class="ma-3" @click="$router.push({ path: `/mijn-trainingen/${training.id}` })">
    <!-- Training Name -->
    <v-card-title>{{ training.name }}</v-card-title>

    <!-- Subtitle Section -->

    <!-- Description -->
    <v-card-text>
      <p><strong>Description:</strong> {{ training.beschrijving }}</p>

      <!-- Total Duration -->
      <p class="duration"><strong>Total Duration:</strong> {{ training.totale_duur }} minutes</p>
    </v-card-text>

    <v-card-subtitle>
      <p><strong>Rating:</strong></p>
      <div class="rating">
        <!-- Render 5 stars and dynamically fill them based on the rating -->
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
}

.fas.fa-star {
  color: #ffc107; /* Gold color for filled stars */
}

.far.fa-star {
  color: #e4e5e9; /* Grey color for empty stars */
}

.duration{
  margin-top: 5px;;
}

</style>
