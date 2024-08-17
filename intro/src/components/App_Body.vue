<!-- src\components\App_Body.vue -->

<template>
  <div class="body">
    <Chatbot @url-click="showVisualizer" />
    <Visualizer :isVisible="isVisualizerVisible" :url="selectedUrl" @close-visualizer="hideVisualizer" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Chatbot from '@/components/Chatbot.vue';
import Visualizer from '@/components/Visualizer.vue';

const isVisualizerVisible = ref(false);
const selectedUrl = ref('');

// Función para mostrar el visualizador
const showVisualizer = (url: string) => {
  selectedUrl.value = url;
  isVisualizerVisible.value = true;
};

// Función para ocultar el visualizador
const hideVisualizer = () => {
  isVisualizerVisible.value = false;
  selectedUrl.value = ''; // Limpia la URL cuando se oculta el visualizador
};
</script>

<style scoped>
.body {
  display: flex;
  flex-grow: 1;
  width: calc(100% - 2px);
  height: calc(100% - 50px);
  box-sizing: border-box;
  overflow: hidden;
  margin: 0px;
  padding: 1px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1),
              0 6px 20px rgba(0, 0, 0, 0.1);
}
</style>




