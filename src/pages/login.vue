<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
  withCredentials: false,
});

export default defineComponent({
  name: "Login",
  emits: ["loginSuccess"],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isRegister: false,
      errorMessage: "",
      stateObj: {
        register: {
          name: "Registreren",
          message: "Heb je al een account? Log in.",
        },
        login: {
          name: "Inloggen",
          message: "Nog geen account? Registreer.",
        },
      },
    };
  },
  computed: {
    toggleMessage() {
      return this.isRegister
        ? this.stateObj.register.message
        : this.stateObj.login.message;
    },
  },
  methods: {
    toggleForm() {
      this.isRegister = !this.isRegister;
      this.errorMessage = ""; // Clear error message when toggling
    },
    async handleSubmit() {
      if (this.isRegister) {
        await this.register();
      } else {
        await this.login();
      }
    },
    async login() {
      try {
        const data = {
          email: this.email,
          password: this.password,
        };
        const response = await axiosInstance.post("/login", data);
        console.log(response.data);
        const {token} = response.data;

        // Save the token in localStorage
        localStorage.setItem("authToken", token);

        // Notify parent component of successful login
        this.$emit("loginSuccess", token);

        await this.saveUserData();
        this.errorMessage = ""; // Clear error message
      } catch (err: any) {
        this.errorMessage = (err.response?.data?.message || "") + ", Login failed.";
      }
    },
    async register() {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
        };
        const response = await axiosInstance.post("/register", data);
        // console.log(response.data);

        this.isRegister = false; // Switch to login view
        this.errorMessage = ""; // Clear error message
        (this.$refs.form as HTMLFormElement).reset(); // Reset the form
      } catch (err: any) {
        this.errorMessage = (err.response?.data?.message || "") + ", Register failed.";
      }
    },
    async saveUserData() {
      try {
        axiosInstance.interceptors.request.use(
          (config) => {
            const token = localStorage.getItem("authToken");
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
        const response = await axiosInstance.get("/user");
        localStorage.setItem("userID", response.data.user.id);
        localStorage.setItem("userRole", response.data.user.role);
        localStorage.setItem("username", response.data.user.name);
        localStorage.setItem("userEmail", response.data.user.email);

      } catch (err: any) {
        this.errorMessage = (err.response?.data?.message || "") + ", smth when wrong";
      }
    },
  },
});
</script>

<template>
  <v-app-bar>
    <v-app-bar-title>Waterpolo Planner</v-app-bar-title>
  </v-app-bar>
  <v-container
    fluid
    fill-height
    class="align-content-center"
    height="100%"
  >
    <v-card
      max-width="500"
      class="elevation-8 mx-auto"
    >
      <v-toolbar
        dark
        color="primary"
      >
        <v-toolbar-title>
          {{ isRegister ? stateObj.register.name : stateObj.login.name }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <form
          ref="form"
          @submit.prevent="handleSubmit"
        >
          <v-text-field
            v-if="isRegister"
            v-model="name"
            name="name"
            label="Naam"
            type="text"
            placeholder="Naam"
            required
          />

          <v-text-field
            v-model="email"
            name="email"
            label="E-mail"
            type="email"
            placeholder="user@example.com"
            required
          />

          <v-text-field
            v-model="password"
            name="password"
            label="Wachtwoord"
            type="password"
            placeholder="password"
            required
          />

          <v-text-field
            v-if="isRegister"
            v-model="confirmPassword"
            name="confirmPassword"
            label="Wachtwoord bevestigen"
            type="password"
            placeholder="wachtwoord"
            required
          />

          <div class="red--text">
            {{ errorMessage }}
          </div>

          <v-btn
            type="submit"
            class="mt-4"
            color="primary"
          >
            {{ isRegister ? stateObj.register.name : stateObj.login.name }}
          </v-btn>

          <div
            class="grey--text mt-4"
            style="cursor: pointer;"
            @click="toggleForm"
          >
            {{ toggleMessage }}
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

