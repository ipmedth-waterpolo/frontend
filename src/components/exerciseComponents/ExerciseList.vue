<script setup lang="ts">
import type { exerciseDao } from "@/api/dao/exercise_dao";
import Exercise from "@/components/exerciseComponents/Exercise.vue";
import { ref, watch } from "vue";
import AddButton from "@/components/small/AddButton.vue";

const selectedExerciseIDs = ref<number[]>(
  JSON.parse(localStorage.getItem("selectedExerciseIDs") || "[]") // Load from localStorage
);

defineProps({
  exercises: {
    type: Array as () => exerciseDao[],
    required: true,
  },
  showAddButton: {
    type: Boolean,
    default: false,
  },
});

// Adds or removes exercise ID
const toggleExerciseSelection = (id: number) => {
  const index = selectedExerciseIDs.value.indexOf(id);
  if (index > -1) {
    selectedExerciseIDs.value.splice(index, 1);
  } else {
    selectedExerciseIDs.value.push(id);
  }
};

// Check if an exercise is selected
const isExerciseSelected = (id: number) => selectedExerciseIDs.value.includes(id);

// Save changes to localStorage
watch(
  selectedExerciseIDs,
  (newVal) => {
    localStorage.setItem("selectedExerciseIDs", JSON.stringify(newVal));
  },
  { deep: true }
);

</script>

<template>
  <v-container max-width="900">
    <v-row>
      <v-col
        v-for="exercise in exercises"
        :key="exercise.id"
        cols="12"
        sm="12"
        md="12"
        lg="12"
      >
        <v-row class="align-center">
          <!-- Exercise Component -->
          <v-col :cols="showAddButton ? 10 : 12">
            <Exercise :exercise />
          </v-col>

          <!-- Conditionally Render Add Button -->
          <template v-if="showAddButton">
            <v-col cols="2" class="d-flex justify-center">
              <AddButton
                :isSelected="isExerciseSelected(parseInt(exercise.id))"
                :onToggle="() => toggleExerciseSelection(parseInt(exercise.id))"
              />
            </v-col>
          </template>
        </v-row>
      </v-col>
      <v-col v-if="exercises.length === 0">
        Geen oefeningen gevonden
      </v-col>
    </v-row>

    <!-- Conditionally Render Banner -->
    <template v-if="showAddButton">
      <v-banner
        class="justify-center position-fixed bottom-0 left-0 right-0"
        bg-color="primary"
        variant="tonal"
        single-line
      >
        <v-banner-text class="text-h6 font-weight-bold">
          <v-icon icon="mdi-basket-outline" />
          {{ selectedExerciseIDs.length }}
        </v-banner-text>
        <v-btn color="white" base-color="white" variant="text" @click="$router.push('/oefeningen/training-maken')">
          Naar selectie
          <v-icon icon="mdi-arrow-right" />
        </v-btn>
      </v-banner>
    </template>
  </v-container>
</template>
