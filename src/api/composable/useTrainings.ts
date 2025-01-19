import {trainingDao} from "@/api/dao/training_dao";
import {inject, ref} from "vue";
import axios from "axios";

export function useTrainings() {
  const apiServiceTrainings = inject("apiServiceTrainings") as {
    getTrainings: () => Promise<trainingDao[]>;
    getTrainingById: (id: string) => Promise<trainingDao>;
    createTraining: (newTraining: Record<string, any>) => Promise<trainingDao>;
    updateTraining: (id: string, updatedTraining: Record<string, any>) => Promise<trainingDao>;
    deleteTraining: (id: string) => Promise<void>;
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

  const editTrainingById = async (id: string, updatedTraining: Record<string, any>) => {
    try {
      const editedTraining = await apiServiceTrainings.updateTraining(id, updatedTraining);
      trainings.value = trainings.value.map((training) => {
        if (training.id === id) {
          return editedTraining;
        }
        return training;
      });
    } catch (err) {
      error.value = "Er is een fout opgetreden bij het bewerken van de training";
      console.error(err);
    }
  }

  const deleteTrainingById = async (id: string) => {
    try {
      await apiServiceTrainings.deleteTraining(id);
      trainings.value = trainings.value.filter((training) => training.id !== id);
    } catch (err) {
      error.value = "Er is een fout opgetreden bij het verwijderen van de training";
      console.error(err);
    }
  };

  const addRating = async (trainingID: number, ratingNumber: number) => {
    try {
      const response = await axios.post(`/training/${trainingID}/rating`, {
        ratingNumber,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding rating:", error);
      throw error;
    }
  };

  return {
    trainings,
    training,
    error,
    fetchTrainings,
    fetchTrainingById,
    createTraining,
    deleteTrainingById,
    editTrainingById,
    addRating,
  };
}
