<script setup lang="ts">

defineProps({
  showBackButton: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <v-toolbar
    density="compact"
    color="secondary"
  >
    <v-row align="center" justify="space-between" class="w-100">
      <v-btn v-if="showBackButton" @click="$router.go(-1)">
        <v-icon size="x-large" icon="mdi-arrow-left"/>
      </v-btn>

      <v-toolbar-title class="text-center">
        <slot></slot>
      </v-toolbar-title>

      <div v-if="showBackButton" style="width: 64px;"></div>
    </v-row>
  </v-toolbar>


</template>

<style scoped>

</style>
