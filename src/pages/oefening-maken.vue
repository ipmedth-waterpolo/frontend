<script lang="ts">
import {defineComponent, ref, } from "vue";
import {useExercises} from "@/api/composable/useExercises";
import ToolbarWithBackButton from "@/components/small/ToolbarWithBackButton.vue";

export default defineComponent({
  name: "oefening-maken",
  components: {ToolbarWithBackButton},
  setup() {
    const {createExercise, error: exerciseError} = useExercises();

    const isSuccess = ref(false);
    const errorMessage = ref("");

    const exerciseData = ref({
      name: "",
      enabled: true,
      categorie: [],
      onderdeel: "Oefening",
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

    const tryToAddExercise = async () => {
      if (!exerciseData.value.name || !exerciseData.value.omschrijving) {
        errorMessage.value = "Naam en omschrijving zijn verplicht!";
        return;
      }

      try {
        const formattedData = {
          ...exerciseData.value,
          categorie: Array.from(exerciseData.value.categorie),
          leeftijdsgroep: Array.from(exerciseData.value.leeftijdsgroep),
          afbeeldingen: exerciseData.value.afbeeldingen
            ? { url: exerciseData.value.afbeeldingen }
            : null,
          videos: exerciseData.value.videos
            ? { url: exerciseData.value.videos }
            : null,
        };

        await createExercise(formattedData);

        isSuccess.value = true;
        errorMessage.value = "";
        // Clear form after successful submission
        exerciseData.value = {
          name: "",
          enabled: true,
          categorie: [],
          onderdeel: "Oefening",
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
        };
      } catch (err) {
        errorMessage.value = "Fout bij het toevoegen van de oefening.";
        isSuccess.value = false;
        console.error("Error creating exercise:", err);
      }
    };


    return {
      exerciseData,
      categoryOptions,
      ageOptions,
      isSuccess,
      errorMessage,
      tryToAddExercise,
      exerciseError,
    };
  },
});
</script>

<template>
  <v-container fluid fill-height max-width="900">
    <v-banner>
      <v-banner-text>
        Vul de gegevens van de nieuwe oefening in. Na het opslaan kan het niet meer aangepast worden! Kijk dus goed of je
        alles correct hebt ingevuld. Alleen administrators kunnen oefeningen aanpassen of verwijderen.
      </v-banner-text>
    </v-banner>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="tryToAddExercise">
          <v-text-field
            v-model="exerciseData.name"
            label="Naam van oefening*"
            required
          />

          <v-textarea
            v-model="exerciseData.omschrijving"
            label="Omschrijving*"
            required
          />

          <v-select
            v-model="exerciseData.categorie"
            :items="categoryOptions"
            label="Categorie"
            multiple
          />

          <v-select
            v-model="exerciseData.leeftijdsgroep"
            :items="ageOptions"
            label="Leeftijdsgroep"
            multiple
          />

          <v-text-field
            v-model="exerciseData.duur"
            label="Duur (minuten)*"
            type="number"
            required
          />

          <v-text-field
            v-model="exerciseData.minimum_aantal_spelers"
            label="Minimaal Aantal Spelers"
            type="number"
            required
          />

          <v-text-field
            v-model="exerciseData.benodigdheden"
            label="Benodigdheden"
          />

          <v-checkbox
            v-model="exerciseData.water_nodig"
            label="Water Nodig?"
          />

          <v-text-field
            v-model="exerciseData.source"
            label="Bron URL"
          />

          <v-text-field
            v-model="exerciseData.afbeeldingen"
            label="Afbeelding URL"
          />

          <v-text-field
            v-model="exerciseData.videos"
            label="Video URL"
          />

          <v-text-field
            v-model="exerciseData.variatie"
            label="Variatie"
          />

          <v-btn type="submit" color="primary" class="ma-3">
            Oefening Opslaan
          </v-btn>

          <v-alert v-if="isSuccess" type="success" dismissible>
            Oefening succesvol toegevoegd!
          </v-alert>
          <v-alert v-if="errorMessage" type="error" dismissible>
            Fout: {{ errorMessage }}
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>

    <v-alert v-if="exerciseError" type="error">
      Fout bij het laden van oefeningen: {{ exerciseError }}
    </v-alert>
  </v-container>
</template>
