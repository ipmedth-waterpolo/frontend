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
import type {PropType} from "vue";

defineProps({
  isSelected: {
    type: Boolean,
    required: true,
  },
  onToggle: {
    type: Function as PropType<() => void>,
    required: true,
  },
});
</script>
