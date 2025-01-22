<script setup lang="ts">
import ExerciseList from "@/components/exerciseComponents/ExerciseList.vue";
import ToolbarWithBackButton from "@/components/small/ToolbarWithBackButton.vue";
import {useTrainings} from "@/composable/useTrainings";
import useUserData from "@/composable/useUserData";
import {computed, ref} from "vue";
import router from "@/router";
import TrainingMaken from "@/pages/training-maken/aanmaken.vue";

const props = defineProps({
  training: {
    type: Object,
    required: true,
  },
});

const {isAdmin, userData} = useUserData();
const {deleteTrainingById, addRating} = useTrainings();

const trashPopup = ref(false);
const removeTraining = async () => {
  await deleteTrainingById(props.training.id);
  trashPopup.value = false;
  await new Promise((r) => setTimeout(r, 100));
  await router.go(-1);
};

const editPopup = ref(false);

const rating = ref<number>(0);
// const getStarClass = (index: number, trainingRating: number) => {
//   return index < trainingRating ? "fas fa-star" : "far fa-star";
// };

const submitRating = async () => {
  console.log(rating.value);
  if (rating.value === 0) return;

  try {
    await addRating(props.training.id, rating.value);
    await new Promise(r => setTimeout(r, 50));
    router.go(0);
  } catch (error) {
    console.error("Failed to submit rating:", error);
  }
};

const trainingIsUsers = () => {
  const userID = userData.value.userID !== null ? userData.value.userID.toString() : '';
  return userID === props.training.userID;
};

const showEditAndDelete = computed(() => {
  return trainingIsUsers() || isAdmin.value;
});

const showGiveRating = computed(() => {
  return !trainingIsUsers();
});

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

          <div v-if="training.ratings" class="rating">
            <div>{{ training.ratings }}</div>
            <i class="fas fa-star"></i>
          </div>
        </div>

        <div
          v-if="showGiveRating"
          class="d-flex justify-center align-center mt-4"
        >
          <v-rating
            v-model="rating"
            :length="5"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="mdi-star-outline"
            hover
            @update:modelValue="submitRating"
          ></v-rating>
        </div>
      </v-card-text>
    </v-card>
    <ExerciseList v-if="training.oefeningen" :exercises="training.oefeningen"/>

    <v-row
      v-if="showEditAndDelete"
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

