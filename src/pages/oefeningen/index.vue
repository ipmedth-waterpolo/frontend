<script setup lang="ts">
import {useExercises} from "@/api/composable/useExercises";
import {useSelectedExercises} from "@/components/exerciseComponents/useSelectedExercises";
import {ref, onMounted} from "vue";
import ExerciseCategoryFilter from "@/components/exerciseComponents/ExerciseCategoryFilter.vue";

const {exercises, error, fetchExercises} = useExercises();
const {selectedExerciseIDs, toggleExerciseSelection, removeAllExercises} = useSelectedExercises();
const trashPopup = ref(false);

onMounted(() => {
  fetchExercises();
});

const clickRemove = () => {
  removeAllExercises();
  trashPopup.value = false;
}

</script>

<template>
  <div v-if="error">error retrieving exercises</div>
  <ExerciseCategoryFilter v-else :exercises/>

  <!--  conditional banner-->
  <div
    v-if="selectedExerciseIDs.length > 0"
  >
    <v-bottom-navigation
      bg-color="primary"
      grow
    >
      <v-btn @click="trashPopup = true" prepend-icon="mdi-trash-can-outline">Legen</v-btn>
      <v-btn @click="$router.push('/oefeningen/training-maken')" prepend-icon="mdi-basket-outline">{{ selectedExerciseIDs.length }}
        geselecteerd
      </v-btn>
      <v-btn @click="$router.push('/oefeningen/training-maken')" prepend-icon="mdi-arrow-right">Verder
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

<style scoped></style>
