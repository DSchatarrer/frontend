<template>
  <div class="chatbot">
    <div class="chat-content">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        :jsonContent="message.jsonContent"
        :isReceived="message.isReceived"
      />
      
      <!-- Add ProgressBar component -->
      <ProgressBar v-if="isProcessing" :progress="progress" :description="progressDescription" />
    </div>
    <ContainerInput
      @send-message="handleSendMessage"
      @upload-file="handleUploadFile"
      @toggle-recording="handleToggleRecording"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import ContainerInput from '@/components/ContainerInput.vue';
import MessageItem from '@/components/MessageItem.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  jsonContent: Record<string, any>;
  isReceived: boolean;
}

const messages = ref<Message[]>([]);
const isProcessing = ref(false); // Reactive property to control the progress bar visibility
const progress = ref(0); // Reactive property to control the progress percentage
const progressDescription = ref(''); // Reactive property to control the progress description

const handleSendMessage = async (messageText: string) => {
  // Genera un UUID para el mensaje del usuario
  const userMessageId = uuidv4();
  
  // Añade el mensaje del usuario al array de mensajes primero, con su data_id
  messages.value.push({ jsonContent: { text: messageText, data_id: userMessageId }, isReceived: false });

  // Fuerza la actualización de la UI inmediatamente
  await nextTick();

  // Inicia el procesamiento y resetea el progreso
  isProcessing.value = true;
  progress.value = 0;
  progressDescription.value = 'Enviando mensaje...';

  // Fuerza la actualización de la UI para mostrar la barra de progreso inmediatamente
  await nextTick();

  // Simula el progreso para demostración
  setTimeout(() => {
    progress.value = 50;
    progressDescription.value = 'Procesando...';
  }, 1000);

  try {
    // Simula un fetch a un servidor y convierte la respuesta a JSON
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

    // Genera un UUID para el mensaje de respuesta del servidor
    const serverMessageId = uuidv4();

    // Simula un retraso para mostrar la barra de progreso antes de añadir el mensaje
    setTimeout(() => {
      // Añade la respuesta del servidor al array de mensajes con su data_id
      messages.value.push({ jsonContent: { ...data, data_id: serverMessageId }, isReceived: true });

      // Completa el progreso
      progress.value = 100;
      progressDescription.value = 'Completado';
    }, 500); // Ajusta el retraso según sea necesario
  } catch (error) {
    console.error('Error fetching data:', error);
    progressDescription.value = 'Ocurrió un error';
  } finally {
    setTimeout(() => {
      isProcessing.value = false;
      progress.value = 0;
      progressDescription.value = '';
    }, 1000); // Oculta la barra de progreso después de un breve retraso
  }
};

const handleUploadFile = (files: FileList) => {
  console.log('Archivos seleccionados:', files);
  // Here you can add logic to handle file uploads.
};

const handleToggleRecording = (isRecording: boolean) => {
  console.log('Grabación activa:', isRecording);
  // Here you can add logic to handle audio recording.
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
  padding-bottom: 80px; /* Ensures space for the input */
}
</style>
