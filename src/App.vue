<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-app-bar-title>Waterpolo Planner</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const drawer = ref(null)
const items = [
  {title: 'Home', to: '/'},
  {title: 'About', to: '/about'},
  {title: 'Contact', to: '/contact'},
  {title: 'Help', to: '/help'},
]

</script>

<script lang="ts">
export default {
  data: () => ({drawer: null}),
}
</script>
