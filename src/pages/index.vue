<script setup lang="ts">
import { useExercises } from "@/composable/useExercises";
import { onMounted } from "vue";
const { exercises, error, fetchExercises } = useExercises();

onMounted(() => {
  fetchExercises();
});
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <ul>
      <!-- <li v-for="exercise in exercises" :key="exercise.id">
        {{ exercise.name }} - {{ exercise.leeftijdsgroep }}
      </li> -->
      <!-- <li v-for="exercise in exercises" :key="exercise.id">
        <span
          v-for="(category, index) in JSON.parse(exercise.categorie)"
          :key="index"
          >{{ category }}
        </span>
      </li> -->
    </ul>
    {{ exercises }}
  </div>
</template>

<!-- <li v-for="exercise in exercises" :key="exercise.id">
  {{ exercise.name }} -
  <span
    v-for="(category, index) in JSON.parse(exercise.categorie)"
    :key="index"
    >{{ category }}</span>
</li> -->
