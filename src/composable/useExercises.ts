import { exerciseDao } from "@/dao/exercise_dao";
import { inject, onMounted, ref } from "vue";

export function useExercises() {
  const apiService = inject("apiService") as {
    getData: () => Promise<exerciseDao[]>;
  };

  const exercises = ref<exerciseDao[]>([]);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const data = await apiService.getData();
      exercises.value = data;
    } catch (err) {
      error.value = "Er is een fout opgetreden bij het ophalen van de data";
      console.error(err);
    }
  });

  return { exercises, error };
}
