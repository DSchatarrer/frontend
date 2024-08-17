<template>
  <div class="message" :class="{ 'received': isReceived }">
    <div class="message-content">
      <!-- Aquí decides qué campos del JSON mostrar -->
      <div v-if="jsonContent.text">
        <strong>Mensaje:</strong> {{ jsonContent.text }}
      </div>
      <div v-if="jsonContent.title">
        <strong>Título:</strong> {{ jsonContent.title }}
      </div>
      <div v-if="jsonContent.completed !== undefined">
        <strong>Completado:</strong> {{ jsonContent.completed ? 'Sí' : 'No' }}
      </div>
      <!-- Puedes seguir añadiendo más campos del JSON según sea necesario -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const { jsonContent, isReceived } = defineProps<{
  jsonContent: Record<string, any>;
  isReceived?: boolean;
}>();
</script>

<style scoped>
.message {
  max-width: 80%;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 10px;
  background-color: #e1e1e1;
  color: #333;
  font-size: 16px;
  line-height: 1.4;
  word-wrap: break-word;
}

.received {
  background-color: #007bff;
  color: #fff;
  align-self: flex-start;
}

.message-content {
  white-space: pre-wrap; /* Mantiene los saltos de línea */
}

.message.received {
  align-self: flex-start;
  background-color: #007bff;
  color: white;
}

.message {
  align-self: flex-end;
}
</style>
