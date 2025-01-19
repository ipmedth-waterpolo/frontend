<script setup lang="ts">
import type {exerciseDao} from "@/api/dao/exercise_dao";
import Exercise from "@/components/exerciseComponents/Exercise.vue";
import {useSelectedExercises} from "@/components/exerciseComponents/useSelectedExercises";
import AddButton from "@/components/small/AddButton.vue";

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

const {selectedExerciseIDs, toggleExerciseSelection} = useSelectedExercises();

// Check if an exercise is selected
const isExerciseSelected = (id: number) => selectedExerciseIDs.value.includes(id);

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
            <Exercise :exercise/>
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
      <v-col cols="12" v-if="exercises.length === 0">
        <v-card>
          <v-card-title class="text-center">Geen oefeningen gevonden</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
