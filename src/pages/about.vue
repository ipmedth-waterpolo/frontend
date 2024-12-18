<script setup lang="ts">
import { ref } from "vue";
import { apiService } from "@/services/apiService";
import { useExercises } from "@/composable/useExercises";

const isSuccess = ref(false);
const errorMessage = ref(""); // Houd foutmelding bij voor debug
const { exercises, error, createExercise } = useExercises();

const addExercise = async () => {
  await createExercise(standaardOefening);
};

// Standaard oefening data
const standaardOefening = {
  name: "Test Oefening",
  enabled: true,
  categorie: JSON.stringify(["techniek"]), // Omzetten naar JSON-string
  onderdeel: "Oefening",
  leeftijdsgroep: JSON.stringify(["O17"]), // Omzetten naar JSON-string
  duur: 30,
  minimum_aantal_spelers: 1,
  benodigdheden: "Ballon",
  water_nodig: true,
  omschrijving: "Een testomschrijving voor een oefening.",
  variatie: "Minder complex",
  source: "https://voorbeeld.com",
  afbeeldingen: JSON.stringify(["https://voorbeeld.com/afbeelding1.jpg"]), // Omzetten naar JSON-string
  videos: JSON.stringify(["https://voorbeeld.com/video1.mp4"]), // Omzetten naar JSON-string
  rating: 4,
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-3">
          <v-card-title>API POST Test</v-card-title>
          <v-card-text>
            <v-btn @click="addExercise" color="primary">
              Verzend Test Oefening
            </v-btn>

            <v-alert v-if="isSuccess" type="success" dismissible>
              Oefening succesvol verzonden!
            </v-alert>
            <v-alert v-if="errorMessage" type="error" dismissible>
              Fout: {{ errorMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  margin-bottom: 1rem;
}
</style>
