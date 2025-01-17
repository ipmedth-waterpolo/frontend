<template>
  <v-card
    class="ma-0 pa-4 d-flex align-center justify-center"
    density="comfortable"
    outlined
    :color="isSelected ? 'primary' : undefined"
    @click.stop="onToggle"
  >
    <v-icon :icon="isSelected ? 'mdi-minus' : 'mdi-plus'" />
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  isSelected: {
    type: Boolean,
    required: true,
  },
  onToggle: {
    type: Function,
    required: true,
  },
});
</script>
