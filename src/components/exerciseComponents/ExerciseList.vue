<script setup lang="ts">
import type {exerciseDao} from "@/api/dao/exercise_dao";
import Exercise from "@/components/exerciseComponents/Exercise.vue";
import {ref, onMounted, watch} from "vue";

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

// defineEmits(["addExercise"]);

const addOrRemoveExercise = (id: number) => {
  if (selectedExerciseIDs.value.includes(id)) {
    selectedExerciseIDs.value.splice(selectedExerciseIDs.value.indexOf(id), 1);
  } else {
    selectedExerciseIDs.value.push(id);
  }
};

// Save to localStorage whenever selectedExerciseIDs changes
watch(
  selectedExerciseIDs,
  (newVal) => {
    localStorage.setItem("selectedExerciseIDs", JSON.stringify(newVal));
  },
  {deep: true}
);

onMounted(() => {
  console.log("Loaded selectedExerciseIDs from localStorage:", selectedExerciseIDs.value);
});
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

        <v-row class="align-center">
          <!-- exercise -->
          <v-col :cols="showAddButton ? 10 : 12">
            <Exercise :exercise/>
          </v-col>

          <!-- Add button -->
          <v-col v-if="showAddButton" cols="2" class="d-flex justify-center">
            <v-card
              class="ma-0 pa-4 d-flex align-center justify-center"
              density="comfortable"
              outlined
              :color="selectedExerciseIDs.includes(parseInt(exercise.id)) ? 'primary' : undefined"
              @click.stop="addOrRemoveExercise(parseInt(exercise.id))"
            >
              <v-icon :icon="selectedExerciseIDs.includes(parseInt(exercise.id)) ? 'mdi-minus' : 'mdi-plus'"/>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer v-if="showAddButton" class="ma-9"></v-spacer>
    </v-row>


    <v-banner
      v-if="showAddButton"
      class="justify-center position-fixed bottom-0 left-0 right-0"
      bg-color="primary"
      variant="tonal"
      single-line
    >
      <v-banner-text class="text-h6 font-weight-bold">
        <v-icon icon="mdi-basket-outline"/>
        {{ selectedExerciseIDs.length }}
      </v-banner-text>
      <v-btn color="white" base-color="white" variant="text" @click="$router.push('/oefeningen/training-maken')">
        Naar selectie
        <v-icon icon="mdi-arrow-right"/>
      </v-btn>
    </v-banner>


  </v-container>
</template>

<style scoped>
/* Add any custom styles here */


</style>
