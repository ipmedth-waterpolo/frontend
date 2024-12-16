import axios from "axios";
import { exerciseDao } from "../dao/exercise_dao";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const mapToExerciseDao = (exercise: {
  id: string;
  name: string;
  enabled: boolean;
  categorie: string;
  onderdeel: string;
  leeftijdsgroep: string;
  duur: number;
  minimum_aantal_spelers: number;
  benodigdheden: string;
  water_nodig: boolean;
  omschrijving: string;
  variatie: string | null | undefined;
  source: string | null | undefined;
  afbeeldingen: string | null | undefined;
  videos: string | null | undefined;
  rating: number | null | undefined;
  created_at: string;
  updated_at: string;
}): exerciseDao => {
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

  async createExercise(newExercise: Record<string, any>): Promise<any> {
    try {
      console.log("POST Request Payload:", newExercise); // Debug payload
      const response = await axiosInstance.post("/data", newExercise);
      console.log("POST Response:", response.data); // Debug server response
      return response.data;
    } catch (error: any) {
      console.error("Fout bij POST-verzoek:", error.message);
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      throw error;
    }
  },
};
