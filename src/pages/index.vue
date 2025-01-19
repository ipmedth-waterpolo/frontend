<script setup lang="ts">

const username = localStorage.getItem('username');

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Welkom {{ username }}!</v-card-title>
      <v-card-text>Dit is de Waterpolo Planner van ZVL-1886. Gebruik deze app om snel een training samen te stellen.
        Open de zijbalk om te navigeren, of bekijk de lijst hieronder.
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-subtitle>Snelkoppelingen</v-card-subtitle>
      <v-card-item>
        <v-list>
          <v-list-item link :to="{ path: '/mijn-trainingen' }">Mijn trainingen</v-list-item>
          <v-list-item link :to="{ path: '/oefeningen'}">Training maken (oefeningen overzicht)</v-list-item>
          <v-list-item link :to="{ path: '/alle-trainingen' }">Alle trainingen</v-list-item>
          <div class="my-8"></div>
          <v-list-item link :to="{ path: '/account' }">Account</v-list-item>
          <v-list-item link :to="{ path: '/about' }">Over de Waterpolo Planner</v-list-item>
        </v-list>
      </v-card-item>
    </v-card>
  </v-container>
</template>

