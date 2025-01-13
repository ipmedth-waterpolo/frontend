<script setup lang="ts">
import { ref } from "vue";
import { useExercises } from "@/api/composable/useExercises";

const isSuccess = ref(false);
const errorMessage = ref("");
const { exercises, error, createExercise } = useExercises();

const categoryOptions = [
  "warming-up",
  "techniek",
  "tactiek",
  "conditie",
  "cooling-down",
  "keeper",
  "theorie",
];

const ageOptions = [
  "O6",
  "O8",
  "O10",
  "O12",
  "O14",
  "O16",
  "O18",
  "Volwassenen",
];

const exerciseData = ref({
  name: "",
  enabled: true,
  categorie: [],
  onderdeel: "",
  leeftijdsgroep: [],
  duur: 10,
  minimum_aantal_spelers: 1,
  benodigdheden: "",
  water_nodig: true,
  omschrijving: "",
  variatie: null,
  source: null,
  afbeeldingen: null,
  videos: null,
  rating: null,
});

const addExercise = async () => {
  // await createExercise(standaardOefening);
  const newExercise = {
    name: exerciseData.value.name,
    enabled: exerciseData.value.enabled,
    categorie: Array.from(exerciseData.value.categorie),
    onderdeel: exerciseData.value.onderdeel || "Oefening",
    leeftijdsgroep: Array.from(exerciseData.value.leeftijdsgroep),
    duur: Number(exerciseData.value.duur),
    minimum_aantal_spelers: Number(exerciseData.value.minimum_aantal_spelers),
    benodigdheden: exerciseData.value.benodigdheden,
    water_nodig: exerciseData.value.water_nodig,
    omschrijving: exerciseData.value.omschrijving,
    variatie: exerciseData.value.variatie || null,
    source: exerciseData.value.source || null,
    afbeeldingen: exerciseData.value.afbeeldingen
      ? JSON.stringify(exerciseData.value.afbeeldingen)
      : null,
    videos: exerciseData.value.videos
      ? JSON.stringify(exerciseData.value.videos)
      : null,
    rating:
      exerciseData.value.rating !== null
        ? Number(exerciseData.value.rating)
        : null,
  };

  await createExercise(newExercise);
};

// Standaard oefening data
// const standaardOefening = {
//   name: "Test Oefening",
//   enabled: true,
//   categorie: JSON.stringify(["techniek"]), // Omzetten naar JSON-string
//   onderdeel: "Oefening",
//   leeftijdsgroep: JSON.stringify(["O17"]), // Omzetten naar JSON-string
//   duur: 30,
//   minimum_aantal_spelers: 1,
//   benodigdheden: "Ballon",
//   water_nodig: true,
//   omschrijving: "Een testomschrijving voor een oefening.",
//   variatie: "Minder complex",
//   source: "https://voorbeeld.com",
//   afbeeldingen: JSON.stringify(["https://voorbeeld.com/afbeelding1.jpg"]), // Omzetten naar JSON-string
//   videos: JSON.stringify(["https://voorbeeld.com/video1.mp4"]), // Omzetten naar JSON-string
//   rating: 4,
// };
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-3">
          <v-card-title>Oefening Toevoegen</v-card-title>
          <v-card-text>
            <v-form>
              <!-- Oefening Naam -->
              <v-text-field
                v-model="exerciseData.name"
                label="Naam Oefening"
                required
              ></v-text-field>

              <!-- Oefening Onderdelen -->
              <!-- <v-text-field
                v-model="exerciseData.onderdeel"
                label="Onderdeel"
                required
              ></v-text-field> -->
              <v-text-field
                v-model="exerciseData.onderdeel"
                label="Onderdeel"
              ></v-text-field>

              <!-- Zelf typen onderdeel en kunnen meerdere zijn -->

              <!-- Oefening Duur -->
              <v-text-field
                v-model="exerciseData.duur"
                label="Duur (minuten)"
                type="number"
                required
              ></v-text-field>

              <!-- Minimum Aantal Spelers -->
              <v-text-field
                v-model="exerciseData.minimum_aantal_spelers"
                label="Minimaal Aantal Spelers"
                type="number"
                required
              ></v-text-field>

              <!-- Benodigdheden -->
              <v-text-field
                v-model="exerciseData.benodigdheden"
                label="Benodigdheden"
              ></v-text-field>

              <!-- Omschrijving -->
              <v-textarea
                v-model="exerciseData.omschrijving"
                label="Omschrijving"
                required
              ></v-textarea>

              <!-- Water Nodig -->
              <v-checkbox
                v-model="exerciseData.water_nodig"
                label="Water Nodig?"
              ></v-checkbox>

              <!-- Source URL -->
              <v-text-field
                v-model="exerciseData.source"
                label="Bron URL"
              ></v-text-field>

              <!-- Afbeelding -->
              <v-text-field
                v-model="exerciseData.afbeeldingen"
                label="Afbeelding URL"
              ></v-text-field>

              <!-- Variatie -->
              <v-text-field
                v-model="exerciseData.variatie"
                label="Variatie"
              ></v-text-field>

              <!-- Categorie (Dropdown select) -->
              <v-select
                v-model="exerciseData.categorie"
                :items="categoryOptions"
                label="Categorie"
                multiple
                required
              ></v-select>

              <!-- Leeftijdsgroep (Dropdown select) -->
              <v-select
                v-model="exerciseData.leeftijdsgroep"
                :items="ageOptions"
                label="Leeftijdsgroep"
                multiple
                required
              ></v-select>

              <v-btn @click="addExercise" color="primary">
                Voeg Oefening Toe
              </v-btn>

              <v-alert v-if="isSuccess" type="success" dismissible>
                Oefening succesvol verzonden!
              </v-alert>
              <v-alert v-if="errorMessage" type="error" dismissible>
                Fout: {{ errorMessage }}
              </v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
