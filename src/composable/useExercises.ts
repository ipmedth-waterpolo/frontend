import { exerciseDao } from "@/dao/exercise_dao";
import { inject, ref } from "vue";

export function useExercises() {
  const apiService = inject("apiService") as {
    getExercises: () => Promise<exerciseDao[]>;
    getExerciseById: (id: string) => Promise<exerciseDao>;
  };

  const exercises = ref<exerciseDao[]>([]);
  const exercise = ref<exerciseDao | null>(null);
  const error = ref<string | null>(null);

  const fetchExercises = async () => {
    try {
      const data = await apiService.getExercises();
      exercises.value = data;
    } catch (err) {
      error.value =
        "Er is een fout opgetreden bij het ophalen van de oefeningen";
      console.error(err);
    }
  };

  const fetchExerciseById = async (id: string) => {
    try {
      const data = await apiService.getExerciseById(id);
      exercise.value = data;
    } catch (err) {
      error.value =
        "Er is een fout opgetreden bij het ophalen van de desbetreffende oefening";
      console.error(err);
    }
  };

  return { exercises, exercise, error, fetchExercises, fetchExerciseById };
}
