<template>
  <v-app-bar>
    <v-app-bar-title>Waterpolo Planner</v-app-bar-title>
  </v-app-bar>
  <ResponsiveContainer>
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
          @submit.prevent="isRegister ? register() : login()"
        >
          <v-text-field
            v-model="email"
            name="email"
            label="E-mail"
            type="text"
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
            value="log in"
          >
            {{ isRegister ? stateObj.register.name : stateObj.login.name }}
          </v-btn>

          <div
            class="grey--text mt-4"
            style="cursor: pointer;"
            @click="isRegister = !isRegister"
          >
            {{ toggleMessage }}
          </div>
        </form>
      </v-card-text>
    </v-card>
  </ResponsiveContainer>
</template>

<script lang="ts">
import ResponsiveContainer from "@/components/ResponsiveContainer.vue";

export default {
  name: "Login",
  components: {ResponsiveContainer},
  data() {
    return {
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
    login() {
      const {email} = this;
      console.log(email + " logged in");
    },
    register() {
      if (this.password === this.confirmPassword) {
        this.isRegister = false;
        this.errorMessage = "";
        this.$refs.form.reset();
      } else {
        this.errorMessage = "Wachtwoorden komen niet overeen";
      }
    },
  },
};
</script>
