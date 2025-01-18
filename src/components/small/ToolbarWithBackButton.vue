<script setup lang="ts">

defineProps({
  showBackButton: {
    type: Boolean,
    default: true
  }
})

</script>

<template>
  <v-toolbar density="compact">
    <v-btn v-if="showBackButton"
      @click="$router.go(-1)"
    >
      <v-icon size="x-large" icon="mdi-arrow-left"/>
    </v-btn>

    <v-toolbar-title class="text-wrap">
      <slot></slot>
    </v-toolbar-title>
  </v-toolbar>
</template>

<style scoped>

</style>
