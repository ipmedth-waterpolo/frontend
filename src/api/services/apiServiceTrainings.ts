import axios from "axios";
import { trainingDao } from "@/api/dao/training_dao";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
    },
});

// Map API response object to trainingDao
const mapToTrainingDao = (training: any): trainingDao => {
    return new trainingDao(
        training.id,
        training.name,
        !!training.enabled, // Ensure boolean type
        training.beschrijving,
        training.oefeningIDs,
        training.userID.toString(), // Ensure string type
        training.totale_duur,
        training.created_at,
        training.updated_at,
        training.ratings ?? null // Handle null ratings
    );
};

export const apiServiceTrainings = {
    // Get the list of ALL trainings
    async getTrainings(): Promise<trainingDao[]> {
        try {
            const response = await axiosInstance.get("/training");
            // Extract and map the `data` array
            return response.data.data.map(mapToTrainingDao);
        } catch (error) {
            console.error("Error fetching trainings:", error);
            throw error;
        }
    },

    // Get a single training by ID
    async getTrainingById(id: string): Promise<trainingDao> {
        try {
            const response = await axiosInstance.get(`/training/${id}`);
            // Extract and map the single training object
            return mapToTrainingDao(response.data.data);
        } catch (error) {
            console.error("Error fetching training by ID:", error);
            throw error;
        }
    },

    // Create a new training
    async createTraining(trainingData: {
        name: string;
        enabled: boolean;
        beschrijving: string;
        oefeningIDs: number[];
        userID: string;
        totale_duur: number;
        ratings?: number | null;
    }): Promise<trainingDao> {
        try {
            const response = await axiosInstance.post("/training", trainingData);
            return mapToTrainingDao(response.data.data);
        } catch (error) {
            console.error("Error creating training:", error);
            throw error;
        }
    },

    // Update an existing training
    async updateTraining(
        id: string,
        trainingData: Partial<trainingDao>
    ): Promise<trainingDao> {
        try {
            const response = await axiosInstance.put(`/training/${id}`, trainingData);
            return mapToTrainingDao(response.data.data);
        } catch (error) {
            console.error("Error updating training:", error);
            throw error;
        }
    },

    // Delete a training by ID
    async deleteTraining(id: string): Promise<void> {
        try {
            await axiosInstance.delete(`/training/${id}`);
        } catch (error) {
            console.error("Error deleting training:", error);
            throw error;
        }
    },
};
