<script lang="ts">
import {defineComponent, ref, computed, onMounted, watch} from "vue";
import {useExercises} from "@/api/composable/useExercises";
import {useTrainings} from "@/api/composable/useTrainings";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import router from "@/router";

export default defineComponent({
  name: "TrainingMaken",
  components: {
    ExerciseList,
  },
  setup() {
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
    const errorMessage = ref("");

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

    const tryToAddTraining = async () => {
      if (!trainingData.value.name || !trainingData.value.beschrijving || !trainingData.value.totale_duur) {
        errorMessage.value = "Alle velden zijn verplicht!";
        return;
      }
      errorMessage.value = ""; // Clear error message if validation passes
      await addTraining();
    };

    const addTraining = async () => {
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
        errorMessage.value = "Er is iets misgegaan bij het opslaan van de training.";
        isSuccess.value = false;
      }
    };

    return {
      formRef,
      trainingData,
      exercises,
      selectedExercises,
      totalDuration,
      exerciseError,
      trainingError,
      selectedExerciseIDs,
      tryToAddTraining,
      errorMessage,
    };
  },
});
</script>

<template>
  <v-container
    fluid
    fill-height
    class="align-content-center"
    height="100%"
    max-width="900"
  >
    <v-card>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="tryToAddTraining">
          <v-text-field
            v-model="trainingData.name"
            label="Naam van de Training"
            placeholder="Nieuwe training"
            required
          />

          <v-textarea
            v-model="trainingData.beschrijving"
            label="Beschrijving"
            required
          />

          <v-text-field
            v-model="trainingData.totale_duur"
            label="Totale Duur (minuten)"
            type="number"
            required
          />


          <v-alert v-if="errorMessage" color="error">
            {{ errorMessage }}
          </v-alert>

          <v-btn type="submit" color="primary" class="ma-3">
            Training Opslaan
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="mt-2">
      <v-card-title>
        Geselecteerde Oefeningen:
      </v-card-title>
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
