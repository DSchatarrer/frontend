<!-- src\components\ChatBot.vue -->

<template>
  <div class="chatbot">
    <div class="chat-content" ref="chatContent">
      <MessageItem
        v-for="(message, index) in messages"
        :key="index"
        :jsonContent="message.jsonContent"
        :isReceived="message.isReceived"
        @url-click="handleUrlClick"
      />
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
import { ref, nextTick, onMounted, watch, computed } from 'vue';
import { useSessionStore } from '@/stores/useSessionStore';
import ContainerInput from '@/components/ContainerInput.vue';
import MessageItem from '@/components/MessageItem.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const emit = defineEmits(['url-click']);

const sessionStore = useSessionStore();
const messages = computed(() => sessionStore.getMessages());
const isProcessing = ref(false);
const progress = ref(0);
const progressDescription = ref('');

const chatContent = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  if (chatContent.value) {
    chatContent.value.scrollTop = chatContent.value.scrollHeight;
  }
};

onMounted(() => {
  sessionStore.loadSessionKey();
  console.log('Sesión cargada con sessionKey:', sessionStore.currentSessionKey);
  scrollToBottom(); // Asegura que la vista esté al final al cargar
});

// Observa los cambios en la sesión actual y actualiza los mensajes
watch(() => sessionStore.currentSessionKey, () => {
  console.log('Cambió la sesión, cargando mensajes para:', sessionStore.currentSessionKey);
  nextTick(() => scrollToBottom());
});

watch(messages, () => {
  nextTick(() => scrollToBottom());
}, { deep: true });

// Manejar el evento url-click aquí
const handleUrlClick = (url: string) => {
  console.log('URL clicked:', url);
  emit('url-click', url); // Emite el evento hacia el padre (App_Body.vue)
};

const handleSendMessage = async (messageText: string) => {
  const userMessageId = uuidv4();
  sessionStore.addMessage({ jsonContent: { text: messageText, data_id: userMessageId }, isReceived: false });

  await nextTick();

  isProcessing.value = true;
  progress.value = 0;
  progressDescription.value = 'Enviando mensaje...';

  await nextTick();

  setTimeout(() => {
    progress.value = 50;
    progressDescription.value = 'Procesando...';
  }, 1000);

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;

    const serverMessageId = uuidv4();

    setTimeout(() => {
      sessionStore.addMessage({ jsonContent: { ...data, data_id: serverMessageId, urls: ["https://arxiv.org/pdf/2304.11477#page=7",
                                                                                        "https://arxiv.org/pdf/2304.11477#page=2",
                                                                                        "https://filesamples.com/samples/document/docx/sample3.docx"] }, isReceived: true });

      progress.value = 100;
      progressDescription.value = 'Completado';
    }, 500);
  } catch (error) {
    console.error('Error fetching data:', error);
    progressDescription.value = 'Ocurrió un error';
  } finally {
    setTimeout(() => {
      isProcessing.value = false;
      progress.value = 0;
      progressDescription.value = '';
    }, 1000);
  }
};


const handleUploadFile = (files: FileList) => {
  console.log('Archivos seleccionados:', files);
};

const handleToggleRecording = (isRecording: boolean) => {
  console.log('Grabación activa:', isRecording);
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
  width: 90%; /* Ajusta el ancho al 90% */
  max-width: 1000px; /* Mantiene un ancho máximo igual al input-container */
  overflow-y: auto;
  margin: 0 auto; /* Centra el contenido horizontalmente */
  margin-bottom: 80px;
}
</style>
