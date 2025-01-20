<script setup lang="ts">
import ExerciseCategoryFilter from "@/components/exerciseComponents/ExerciseCategoryFilter.vue";
import {useSelectedExercises} from "@/components/exerciseComponents/useSelectedExercises";
import type {exerciseDao} from "@/api/dao/exercise_dao";
import {ref} from "vue";

defineProps<{
  exercises: exerciseDao[];
  isCreateTrainingMode: boolean;
}>();

const {selectedExerciseIDs, toggleExerciseSelection, removeAllExercises} = useSelectedExercises();
const trashPopup = ref(false);

const clickRemove = () => {
  removeAllExercises();
  trashPopup.value = false;
};

</script>

<template>
  <ExerciseCategoryFilter :exercises :showAddButton="isCreateTrainingMode"/>

  <div
    v-if="isCreateTrainingMode && selectedExerciseIDs.length > 0"
  >
    <v-bottom-navigation
      bg-color="primary"
      grow
    >
      <v-btn @click="trashPopup = true" prepend-icon="mdi-trash-can-outline">Legen</v-btn>
      <v-btn @click="$router.push('/training-maken/aanmaken')" prepend-icon="mdi-basket-outline">
        {{ selectedExerciseIDs.length }}
        geselecteerd
      </v-btn>
      <v-btn @click="$router.push('/training-maken/aanmaken')" prepend-icon="mdi-arrow-right">Verder
      </v-btn>
    </v-bottom-navigation>
  </div>
  <v-dialog
    v-model="trashPopup"
    max-width="500"
  >
    <v-card>
      <v-card-title class="mb-4">Huidige selectie legen?</v-card-title>
      <v-btn
        @click="clickRemove"
        color="red"
        large
        class="mx-auto my-1"
      >
        Verwijder
      </v-btn>
      <v-btn
        @click="trashPopup = false"
        color="primary"
        large
        class="mx-auto my-1"
      >
        Annuleren
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
