<script setup lang="ts">
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
  <v-card @click="$router.push({ path: `/alle-trainingen/${training.id}` })"
  width="450">
    <!-- Training Name -->
    <v-card-title>{{ training.name }}</v-card-title>

    <!-- Description -->
    <v-card-text>
      <div class="spaced">{{ training.beschrijving }}</div>

      <!-- Duration and Rating -->
      <div class="duration-rating">
        <div class="duration">
          <v-icon icon="mdi-clock-outline" />
          <span>{{ training.totale_duur }}</span>
        </div>

        <div class="rating">
          <i
            v-for="index in 5"
            :key="index"
            :class="getStarClass(index, training.ratings)"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.rating {
  display: flex;
  gap: 5px;
  align-items: center;
}

.fas.fa-star {
  color: #ffc107; /* Gold color for filled stars */
}

.far.fa-star {
  color: #e4e5e9; /* Grey color for empty stars */
}

.spaced {
  margin-bottom: 16px; /* Add vertical spacing between elements */
}

.duration-rating {
  display: flex;
  justify-content: space-between; /* Align duration to the left and rating to the right */
  align-items: center;
}

.duration {
  display: flex;
  align-items: center;
  gap: 8px; /* Space between clock icon and duration text */
}
</style>
