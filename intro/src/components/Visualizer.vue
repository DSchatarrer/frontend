<!-- src\components\Visualizer.vue -->

<template>
  <div v-if="isVisible" class="visualizer">
    <button class="close-button" @click="closeVisualizer">✖</button>
    <h3>Visualizer Content</h3>
    <p>Currently showing content for: <strong>{{ url }}</strong></p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean;
  url: string;
}>();

const emit = defineEmits(['close-visualizer']);

const closeVisualizer = () => {
  emit('close-visualizer');
};
</script>

<style scoped>
.visualizer {
  background-color: rgba(76, 82, 83, 0.24);
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: black;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
