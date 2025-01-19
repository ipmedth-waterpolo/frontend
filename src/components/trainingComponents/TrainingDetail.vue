<script setup lang="ts">
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import ToolbarWithBackButton from "@/components/small/ToolbarWithBackButton.vue";
import {useTrainings} from "@/api/composable/useTrainings";
import {ref} from "vue";
import router from "@/router";
import TrainingMaken from "@/pages/oefeningen/training-maken.vue";

const props = defineProps({
  training: {
    type: Object,
    required: true,
  },
});

const {deleteTrainingById, editTrainingById} = useTrainings();

const trashPopup = ref(false);
const removeTraining = async () => {
  await deleteTrainingById(props.training.id);
  trashPopup.value = false;
  await new Promise(r => setTimeout(r, 100));
  await router.go(-1);
}

const editPopup = ref(false);
const editTraining = () => {
  //
}

const getStarClass = (index: number, rating: number) => {
  return index < rating ? 'fas fa-star' : 'far fa-star';
};

const userHasAccess = () => {
  return (localStorage.getItem('userID') === props.training.userID) ||
    (localStorage.getItem('userRole') === 'admin');
};

</script>

<template>
  <ToolbarWithBackButton>{{ training.name }}</ToolbarWithBackButton>

  <v-container
    fluid
    fill-height
    class="align-content-center"
    height="100%"
    max-width="900"
  >
    <v-card>
      <v-card-text>
        <div class="spaced">{{ training.beschrijving }}</div>

        <!-- Duration and Rating -->
        <div class="duration-rating">
          <div class="duration">
            <v-icon icon="mdi-clock-outline"/>
            <span>{{ training.totale_duur }} minuten</span>
          </div>

          <div class="rating">
            <i
              v-for="index in 5"
              :key="index"
              :class="getStarClass(index, training.ratings)"
            />
          </div>
        </div>
      </v-card-text>
    </v-card>
    <ExerciseList v-if="training.oefeningen" :exercises="training.oefeningen"/>

    <v-row
      v-if="userHasAccess()"
      class="d-flex justify-center align-center mb-2"
    >
      <v-col cols="auto">
        <v-btn
          @click="editPopup = true"
          prepend-icon="mdi-pencil-outline"
          color="primary"
        >
          Training Aanpassen
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          @click="trashPopup = true"
          prepend-icon="mdi-trash-can-outline"
          color="error"
        >
          Training Verwijderen
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="trashPopup"
      max-width="500"
    >
      <v-card>
        <v-card-text class="mb-4">Weet je zeker dat je deze training wilt verwijderen?</v-card-text>
        <v-btn
          @click="removeTraining"
          color="error"
          large
          class="mx-auto my-2"
        >
          Verwijder
        </v-btn>
        <v-btn
          @click="trashPopup = false"
          color="primary"
          large
          class="mx-auto my-2 mb-2"
        >
          Annuleren
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="editPopup"

    >
      <training-maken :isEditing="true" :trainingToEdit="training"></training-maken>

    </v-dialog>

  </v-container>
</template>


<style scoped>
.rating {
  display: flex;
  gap: 5px;
  align-items: center;
}

.fas.fa-star {
  color: #ffc107; /* Gold color for filled stars */
}

.far.fa-star {
  color: #e4e5e9; /* Grey color for empty stars */
}

.spaced {
  margin-bottom: 16px;
}

.duration-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.duration {
  display: flex;
  align-items: center;
  gap: 8px;
}

v-card {
  max-width: 450px;
  margin: auto;
}
</style>

