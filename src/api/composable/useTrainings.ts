import {trainingDao} from "@/api/dao/training_dao";
import {inject, ref} from "vue";

export function useTrainings() {
  const apiServiceTrainings = inject("apiServiceTrainings") as {
    getTrainings: () => Promise<trainingDao[]>;
    getTrainingById: (id: string) => Promise<trainingDao>;
    createTraining: (newTraining: Record<string, any>) => Promise<trainingDao>;
  };

  const trainings = ref<trainingDao[]>([]);
  const training = ref<trainingDao | null>(null);
  const error = ref<string | null>(null);

  const fetchTrainings = async () => {
    try {
      trainings.value = await apiServiceTrainings.getTrainings();
    } catch (err) {
      error.value = "Er is een fout opgetreden bij het ophalen van de trainingen";
      console.error(err);
    }
  };

  const fetchTrainingById = async (id: string) => {
    try {
      training.value = await apiServiceTrainings.getTrainingById(id);
    } catch (err) {
      error.value = "Er is een fout opgetreden bij het ophalen van de desbetreffende training";
      console.error(err);
    }
  };

  const createTraining = async (newTraining: Record<string, any>) => {
    try {
      const createdTraining = await apiServiceTrainings.createTraining(newTraining);
      trainings.value.push(createdTraining);
    } catch (err) {
      error.value = "Er is een fout opgetreden bij het toevoegen van de training";
      console.error(err);
    }
  };

  return {
    trainings,
    training,
    error,
    fetchTrainings,
    fetchTrainingById,
    createTraining,
  };
}
