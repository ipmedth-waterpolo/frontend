import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  // baseURL: "https://waterpolo-planner.wptraining.info/api",
});
