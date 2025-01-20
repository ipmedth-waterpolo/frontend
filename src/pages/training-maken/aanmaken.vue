<script lang="ts">
import {defineComponent, ref, computed, onMounted, watch} from "vue";
import {useExercises} from "@/api/composable/useExercises";
import {useTrainings} from "@/api/composable/useTrainings";
import {useSelectedExercises} from "@/components/exerciseComponents/useSelectedExercises";
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import router from "@/router";
import ToolbarWithBackButton from "@/components/small/ToolbarWithBackButton.vue";

export default defineComponent({
  name: "TrainingMaken",
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    trainingToEdit: {
      type: Object,
      default: null
    }
  },
  components: {
    ToolbarWithBackButton,
    ExerciseList
  },
  setup(props) {
    const {exercises, error: exerciseError, fetchExercises} = useExercises();
    const {createTraining, editTrainingById, error: trainingError} = useTrainings();
    const {selectedExerciseIDs, removeAllExercises} = useSelectedExercises();

    const formRef = ref();

    const trainingData = ref({
      name: props.trainingToEdit ? props.trainingToEdit.name : "",
      beschrijving: props.trainingToEdit ? props.trainingToEdit.beschrijving : "",
      totale_duur: props.trainingToEdit ? props.trainingToEdit.totale_duur : "",
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

    const submitForm = () => {
      if (props.isEditing) {
        tryToEditTraining();
      } else {
        tryToAddTraining();
      }
    }

    const tryToEditTraining = async () => {
      const editedTraining = {
        name: trainingData.value.name,
        beschrijving: trainingData.value.beschrijving,
        totale_duur: trainingData.value.totale_duur,
        // oefeningen: selectedExerciseIDs.value.join(","),
      };
      try {
        await editTrainingById(props.trainingToEdit.id, editedTraining);
        isSuccess.value = true;
        await router.push("/mijn-trainingen");
        // await new Promise(r => setTimeout(r, 100));
        // router.go(0);
      } catch (err) {
        console.error("Failed to create training:", err);
        errorMessage.value = "Er is iets misgegaan bij het opslaan van de training.";
      }
    };

    const tryToAddTraining = async () => {
      selectedExerciseIDs.value = JSON.parse(localStorage.getItem("selectedExerciseIDs") || "[]");
      if (!trainingData.value.name || !trainingData.value.beschrijving || !trainingData.value.totale_duur) {
        errorMessage.value = "Alle velden zijn verplicht!";
        return;
      }
      if (selectedExerciseIDs.value.length === 0) {
        errorMessage.value = "Voeg minimaal 1 oefening toe!";
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
        removeAllExercises();
        await router.push("/mijn-trainingen");
        await new Promise(r => setTimeout(r, 100));
        router.go(0);
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
      submitForm
    };
  },
});
</script>

<template>
  <ToolbarWithBackButton v-if="!isEditing">Nieuwe Training</ToolbarWithBackButton>
  <v-container
    fluid
    fill-height
    class="align-content-center"
    max-width="900"
  >
    <v-card>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="submitForm">
          <v-text-field
            v-model="trainingData.name"
            label="Naam van de Training*"
            placeholder="Nieuwe training"
            required
          />

          <v-textarea
            v-model="trainingData.beschrijving"
            label="Beschrijving*"
            required
          />

          <v-text-field
            v-model="trainingData.totale_duur"
            label="Totale Duur (minuten)*"
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
    <div v-if="!isEditing">
      <v-card class="mt-2">
        <v-card-title>
          {{ selectedExercises.length }} Geselecteerde oefening{{ selectedExercises.length === 1 ? "" : "en" }}:
        </v-card-title>
      </v-card>

      <ExerciseList
        :exercises="selectedExercises"
        :show-add-button="true"
      />
    </div>

    <v-alert v-if="exerciseError" type="error">
      Fout bij het laden van oefeningen: {{ exerciseError }}
    </v-alert>

    <v-alert v-if="trainingError" type="error" dismissible>
      Fout: {{ trainingError }}
    </v-alert>
  </v-container>
</template>
