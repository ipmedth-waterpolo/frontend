import { ref } from 'vue';

const selectedExerciseIDs = ref<number[]>(
  JSON.parse(localStorage.getItem('selectedExerciseIDs') || '[]')
);

const toggleExerciseSelection = (id: number) => {
  const index = selectedExerciseIDs.value.indexOf(id);
  if (index > -1) {
    selectedExerciseIDs.value.splice(index, 1);
  } else {
    selectedExerciseIDs.value.push(id);
  }
  localStorage.setItem('selectedExerciseIDs', JSON.stringify(selectedExerciseIDs.value));
};

const removeAllExercises = () => {
  selectedExerciseIDs.value = [];
  localStorage.removeItem('selectedExerciseIDs');
}

export const useSelectedExercises = () => ({
  selectedExerciseIDs,
  toggleExerciseSelection,
  removeAllExercises
});
