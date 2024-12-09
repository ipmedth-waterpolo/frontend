<script setup lang="ts">
import {ref} from 'vue'

const drawer = ref(null)
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>


<script lang="ts">
export default {
  data: () => ({drawer: null}),
}
</script>


<template>
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
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <v-app-bar-title>Waterpolo Planner</v-app-bar-title>
  </v-app-bar>
  <v-main>
    <router-view />
  </v-main>
</template>

<style scoped>

</style>
