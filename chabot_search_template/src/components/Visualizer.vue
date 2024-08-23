<!-- src\components\Visualizer.vue -->

<template>
  <div v-if="isVisible" class="visualizer">
    <button class="close-button" @click="closeVisualizer">✖</button>
    <h3>Visualizer Content</h3>
    <p>Currently showing content for: <strong>{{ pdfUrl }}</strong></p>

    <!-- Si la URL es un PDF, usa el componente VuePDF -->
    <VuePDF 
      v-if="isPdf" 
      :pdf="pdf" 
      :page="currentPage" 
      class="content-frame" 
    />

    <!-- Si no es un PDF, usa el iframe -->
    <iframe 
      v-else
      :key="pdfUrl"
      :src="`${pdfUrl}?igu=1`" 
      class="content-frame" 
      frameborder="0"
      allowfullscreen>
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { VuePDF, usePDF } from '@tato30/vue-pdf';
import '@tato30/vue-pdf/style.css';

const props = defineProps<{
  isVisible: boolean;
  url: string;
}>();

const emit = defineEmits(['close-visualizer']);

const closeVisualizer = () => {
  emit('close-visualizer');
};

// Comprobar si la URL es un PDF
const isPdf = computed(() => {
  return props.url.endsWith('.pdf');
});

// Extraer el número de página de la URL (si existe)
const currentPage = ref(1); // Página por defecto

const updatePageFromUrl = () => {
  const urlParams = new URLSearchParams(props.url.split('?')[1]);
  const pageParam = urlParams.get('page');
  if (pageParam) {
    currentPage.value = parseInt(pageParam, 10);
  }
};

// Extraer la URL del PDF y el número de página
const pdfUrl = computed(() => {
  return props.url.split('?')[0];
});

const { pdf } = usePDF(pdfUrl.value);

// Actualizar la página desde la URL al montar el componente
updatePageFromUrl();
</script>

<style scoped>
.visualizer {
  background-color: rgba(76, 82, 83, 0.24);
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  transition: width 0.3s ease;
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

.content-frame {
  width: 95%;
  height: 75%;
  border: none;
  overflow: auto;
  margin-top: 20px;
}
</style>
