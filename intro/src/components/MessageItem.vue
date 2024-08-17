<!-- src\components\MessageItem.vue -->

<template>
  <div class="message-wrapper" :class="{ 'received': isReceived }">
    <img 
      :src="isReceived ? receivedLogo : sentLogo" 
      alt="User Logo" 
      class="message-logo"
    />
    <div class="message" :data-id="jsonContent.data_id">
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
  </div>
</template>

<script lang="ts" setup>
// Importa las imágenes
import sentLogo from '@/assets/responsable.png';
import receivedLogo from '@/assets/logo2.png';

const { jsonContent, isReceived } = defineProps<{
  jsonContent: Record<string, any>;
  isReceived?: boolean;
}>();

const emit = defineEmits(['url-click']);

const handleUrlClick = (url: string) => {
  emit('url-click', url); // Emitir el evento desde MessageItem.vue
};
</script>

<style scoped>
.message-wrapper {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
}

.message-wrapper.received {
  flex-direction: row;
}

.message-wrapper:not(.received) {
  flex-direction: row-reverse;
}

.message-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.message-wrapper:not(.received) .message-logo {
  margin-right: 0;
  margin-left: 10px;
}

.message {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: #e1e1e1;
  color: #333;
  font-size: 16px;
  line-height: 1.4;
  word-wrap: break-word;
}

.message.received {
  background-color: #007bff;
  color: #fff;
}

.message-content {
  white-space: pre-wrap;
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

