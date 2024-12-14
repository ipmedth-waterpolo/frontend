import axios from "axios";
import { exerciseDao } from "../dao/exercise_dao";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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

export const apiService = {
  //Get the list of ALL exercises
  async getExercises(): Promise<exerciseDao[]> {
    try {
      const response = await axiosInstance.get("/data");
      return response.data.map(mapToExerciseDao);
    } catch (error) {
      throw error;
    }
  },

  async getExerciseById(id: string): Promise<exerciseDao> {
    try {
      const response = await axiosInstance.get(`/data/${id}`);
      return mapToExerciseDao(response.data);
    } catch (error) {
      throw error;
    }
  },
};
