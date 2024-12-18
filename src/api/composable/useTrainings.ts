import {trainingDao} from "@/api/dao/training_dao";
import {inject, ref} from "vue";

export function useTrainings() {
  // Inject the API service, assuming it provides training-related methods
  const apiServiceTrainings = inject("apiServiceTrainings") as {
    getTrainings: () => Promise<trainingDao[]>;
    getTrainingById: (id: string) => Promise<trainingDao>;
  };

  // Reactive state variables
  const trainings = ref<trainingDao[]>([]);
  const training = ref<trainingDao | null>(null);
  const error = ref<string | null>(null);

  // Fetch all trainings
  const fetchTrainings = async () => {
    try {
      trainings.value = await apiServiceTrainings.getTrainings();
    } catch (err) {
      error.value =
        "Er is een fout opgetreden bij het ophalen van de trainingen";
      console.error(err);
    }
  };

  // Fetch a single training by ID
  const fetchTrainingById = async (id: string) => {
    try {
      training.value = await apiServiceTrainings.getTrainingById(id);
    } catch (err) {
      error.value =
        "Er is een fout opgetreden bij het ophalen van de desbetreffende training";
      console.error(err);
    }
  };

  // Return the reactive state and methods
  return {
    trainings,
    training,
    error,
    fetchTrainings,
    fetchTrainingById,
  };
}
