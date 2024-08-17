<!-- src\components\MessageItem.vue -->

<template>
  <div class="message" :class="{ 'received': isReceived }" :data-id="jsonContent.data_id">
    <div class="message-content">
      <div v-if="jsonContent.text">
        <strong>Mensaje:</strong> {{ jsonContent.text }}
      </div>
      <div v-if="jsonContent.title">
        <strong>Título:</strong> {{ jsonContent.title }}
      </div>
      <div v-if="jsonContent.completed !== undefined">
        <strong>Completado:</strong> {{ jsonContent.completed ? 'Sí' : 'No' }}
      </div>
      <div v-if="jsonContent.urls && jsonContent.urls.length">
        <strong>Enlaces:</strong>
        <ul>
          <li v-for="(url, index) in jsonContent.urls" :key="index">
            <a href="#" @click.prevent="handleUrlClick(url)">
              {{ url }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { jsonContent, isReceived } = defineProps<{
  jsonContent: Record<string, any>;
  isReceived?: boolean;
}>();

const emit = defineEmits(['url-click']);

const handleUrlClick = (url: string) => {
  emit('url-click', url);
};
</script>

<style scoped>
.message {
  max-width: 70%;
  padding: 10px 15px;
  margin: 10px auto; /* Centrar horizontalmente */
  border-radius: 10px;
  background-color: #e1e1e1;
  color: #333;
  font-size: 16px;
  line-height: 1.4;
  word-wrap: break-word;
  align-self: flex-end; /* Alinea el mensaje del usuario a la derecha */
}

.received {
  align-self: flex-start; /* Alinea el mensaje recibido a la izquierda */
  background-color: #007bff;
  color: white;
}

.message-content {
  white-space: pre-wrap; /* Mantiene los saltos de línea */
}

ul {
  padding-left: 15px;
}

a {
  color: #0066cc;
  text-decoration: underline;
  font-size: 0.9em;
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
