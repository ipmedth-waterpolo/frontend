<script setup lang="ts">
import {ref, computed} from "vue";
import {useRoute} from "vue-router";

const props = defineProps({
  items: {
    type: Array as () => { title: string; to: string; appBarTitle: string }[],
    required: true,
  },
});

const drawer = ref(false); // Drawer state
const route = useRoute(); // Current route

// iets te ingewikkelde code die deep routes handelt voor app bar title
const currentAppBarTitle = computed(() => {
  const sortedItems = [...props.items].sort((a, b) => b.to.length - a.to.length);
  const matchingItem = sortedItems.find((item) => route.path.startsWith(item.to));
  return matchingItem?.appBarTitle || "Waterpolo Planner";
});

</script>

<template>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item v-for="(item, i) in props.items" :key="i" :to="item.to">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar>
    <v-app-bar-nav-icon @click="drawer = !drawer"/>
    <v-app-bar-title>{{ currentAppBarTitle }}</v-app-bar-title>
    <v-btn icon @click="$router.push('/')">
      <v-img
        inline
        class="mx-2"
        src="@/assets/ZVL_Logo.png"
        contain
        height="36"
        width="36"
      />
    </v-btn>
  </v-app-bar>

  <v-main>
    <router-view/>
  </v-main>
</template>
