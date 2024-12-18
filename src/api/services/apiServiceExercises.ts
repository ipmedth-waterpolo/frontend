import axios from "axios";
import {exerciseDao} from "../dao/exercise_dao";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
    },
});

const mapToExerciseDao = (exercise: exerciseDao): exerciseDao => {
    return new exerciseDao(
        exercise.id,
        exercise.name,
        exercise.enabled,
        exercise.categorie,
        exercise.onderdeel,
        exercise.leeftijdsgroep,
        exercise.duur,
        exercise.minimum_aantal_spelers,
        exercise.benodigdheden,
        exercise.water_nodig,
        exercise.omschrijving,
        exercise.variatie,
        exercise.source,
        exercise.afbeeldingen,
        exercise.videos,
        exercise.rating,
        exercise.created_at,
        exercise.updated_at
    );
};

export const apiServiceExercises = {
    //Get the list of ALL exercises
    async getExercises(): Promise<exerciseDao[]> {
        try {
            const response = await axiosInstance.get("/data");
            return response.data.map(mapToExerciseDao);
        } catch (error) {
            throw error;
        }
    },

    //Get exercise by ID
    async getExerciseById(id: string): Promise<exerciseDao> {
        try {
            const response = await axiosInstance.get(`/data/${id}`);
            return mapToExerciseDao(response.data);
        } catch (error) {
            throw error;
        }
    },

    //Delete exercise by ID
    async deleteExercise(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`/data/${id}`);
        } catch (error) {
            throw error;
        }
    },

  //Add exercise to DB
  async createExercise(newExercise: unknown): Promise<any> {
    try {
      const response = await axiosInstance.post("/data", newExercise);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
