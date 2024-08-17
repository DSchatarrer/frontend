<template>
  <div class="chatbot">
    <div class="chat-content">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        :jsonContent="message.jsonContent"
        :isReceived="message.isReceived"
      />
    </div>
    <ContainerInput
      @send-message="handleSendMessage"
      @upload-file="handleUploadFile"
      @toggle-recording="handleToggleRecording"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContainerInput from '@/components/ContainerInput.vue';
import MessageItem from '@/components/MessageItem.vue';

interface Message {
  jsonContent: Record<string, any>;
  isReceived: boolean;
}

const messages = ref<Message[]>([]);

const handleSendMessage = async (messageText: string) => {
  // Añade el mensaje enviado por el usuario primero
  messages.value.push({ jsonContent: { text: messageText }, isReceived: false });

  try {
    // Simula un fetch a un servidor y convierte la respuesta en JSON
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Convierte la respuesta a JSON
    
    // Añade la respuesta del servidor al array de mensajes
    messages.value.push({ jsonContent: data, isReceived: true });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleUploadFile = (files: FileList) => {
  console.log('Archivos seleccionados:', files);
  // Aquí puedes agregar lógica para manejar los archivos subidos.
};

const handleToggleRecording = (isRecording: boolean) => {
  console.log('Grabación activa:', isRecording);
  // Aquí puedes agregar lógica para manejar la grabación de audio.
};
</script>

<style scoped>
.chatbot {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(76, 82, 83, 0.24);
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px; /* Asegura espacio para el input */
}
</style>
