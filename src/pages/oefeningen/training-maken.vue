<script setup lang="ts">
import {ref, computed, onMounted, watch} from "vue";
import {useExercises} from "@/api/composable/useExercises";
import {useTrainings} from "@/api/composable/useTrainings";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import router from "@/router";

const {exercises, error: exerciseError, fetchExercises} = useExercises();
const {createTraining, error: trainingError} = useTrainings();

const formRef = ref(); // Reference to the v-form
const selectedExerciseIDs = ref<number[]>(
  JSON.parse(localStorage.getItem("selectedExerciseIDs") || "[]")
);

const trainingData = ref({
  name: "",
  beschrijving: "",
  totale_duur: "",
});

const isSuccess = ref(false);

onMounted(() => {
  fetchExercises();
});

const selectedExercises = computed(() => {
  return exercises.value.filter((exercise) =>
    selectedExerciseIDs.value.includes(parseInt(exercise.id))
  );
});

const totalDuration = computed(() => {
  return selectedExercises.value.reduce((total, exercise) => {
    return total + exercise.duur;
  }, 0);
});

const exerciseNames = computed(() => {
  return selectedExercises.value.map((exercise) => exercise.name).join(", ");
});

watch(exerciseNames, (newValue) => {
  trainingData.value.beschrijving = newValue;
});

watch(totalDuration, (newValue) => {
  trainingData.value.totale_duur = newValue.toString();
});


const addTraining = async () => {
  const isFormValid = formRef.value?.validate(); // Validate the form

  if (!isFormValid) {
    isSuccess.value = false; // Ensure no success message shows
    return;
  }

  const newTraining = {
    name: trainingData.value.name,
    beschrijving: trainingData.value.beschrijving,
    totale_duur: trainingData.value.totale_duur,
    oefeningen: selectedExerciseIDs.value.join(","),
  };

  try {
    await createTraining(newTraining);
    isSuccess.value = true;
    localStorage.setItem("selectedExerciseIDs", JSON.stringify([]));
    await router.push("/mijn-trainingen");
  } catch (err) {
    console.error("Failed to create training:", err);
    isSuccess.value = false;
  }
};
</script>

<template>
  <v-container
    fluid
    fill-height
    class="align-content-center"
    height="100%"
  >
    <v-card>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="addTraining">
          <v-text-field
            v-model="trainingData.name"
            label="Naam van de Training"
            placeholder="Nieuwe training"
            required
            :rules="[v => !!v || 'Naam is verplicht']"
          />

          <v-textarea
            v-model="trainingData.beschrijving"
            label="Beschrijving"
            required
            :rules="[v => !!v || 'Beschrijving is verplicht']"
          />

          <v-text-field
            v-model="trainingData.totale_duur"
            label="Totale Duur (minuten)"
            type="number"
            required
            :rules="[v => !!v || 'Totale duur is verplicht']"
          />

          <v-btn type="submit" color="primary" class="ma-3">
            Training Opslaan
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-text>Geselecteerde Oefeningen:</v-card-text>
    </v-card>

    <ExerciseList
      v-if="exercises && exercises.length > 0"
      :exercises="selectedExercises"
    />

    <v-alert v-if="exerciseError" type="error">
      Fout bij het laden van oefeningen: {{ exerciseError }}
    </v-alert>

    <v-alert v-if="trainingError" type="error" dismissible>
      Fout: {{ trainingError }}
    </v-alert>
  </v-container>
</template>
