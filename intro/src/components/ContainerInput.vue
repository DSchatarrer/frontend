<template>
  <div class="input-container">
    <div class="message-input">
      <input
        id="message-textField"
        type="text"
        v-model="messageText"
        @keyup.enter="sendMessage"
        placeholder="Escriba su mensaje..."
        :disabled="isProcessing"
        class="input-box"
        autocomplete="off"
      />
      <img
        :src="sendIcon"
        alt="Enviar"
        @click="sendMessage"
        class="send-button"
        :class="{ 'disabled': isProcessing }"
      />
      <img
        :src="attachIcon"
        alt="Adjuntos"
        class="adjuntos"
        :class="{ 'disabled': isProcessing }"
        @click="triggerFileUpload"
      />
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        multiple
        style="display: none;"
      />
      <img
        :src="microphoneImage"
        alt="Micrófono"
        @click="toggleRecording"
        :class="{ 'active': isRecording, 'disabled': isProcessing }"
        class="microfono"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SpeechRecognitionHandler from '@/services/speechRecognitionService'; // Importa el servicio de reconocimiento de voz

import sendIcon from '@/assets/icons/send.svg';
import attachIcon from '@/assets/icons/attachment.svg';
import microIcon from '@/assets/icons/micro.svg';
import microOnIcon from '@/assets/icons/micro-on.svg';

// Ya no es necesario importar `defineEmits`
const emit = defineEmits(['send-message', 'upload-file', 'toggle-recording']);

const messageText = ref("");
const isProcessing = ref(false);
const isRecording = ref(false);
const microphoneImage = ref(microIcon);
const fileInput = ref<HTMLInputElement | null>(null);

// Crea una instancia de SpeechRecognitionHandler
const speechRecognitionHandler = new SpeechRecognitionHandler('es-ES');

const sendMessage = () => {
  if (messageText.value.trim() === "" || isProcessing.value) return;
  emit('send-message', messageText.value);
  messageText.value = "";
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    emit('upload-file', files);
  }
};

function startRecording() {
  if (isProcessing.value) return;

  speechRecognitionHandler.start(
    (transcript: string) => {
      messageText.value = transcript;
      sendMessage();
      stopRecording(); // Detener la grabación después de enviar el mensaje
    },
    (error: string) => {
      alert(error);
      stopRecording(); // Detener la grabación en caso de error
    }
  );

  isRecording.value = true;
  microphoneImage.value = microOnIcon;
}

function stopRecording() {
  if (speechRecognitionHandler.recognition) {
    speechRecognitionHandler.stop();
  }
  isRecording.value = false;
  microphoneImage.value = microIcon;
}

function toggleRecording() {
  if (isProcessing.value) return;
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: center; /* Centra el contenedor de entrada horizontalmente */
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
}

.message-input {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%; /* Ajusta el tamaño para que ocupe el 90% del ancho */
  max-width: 1000px; /* Mantiene un ancho máximo */
}

.input-box {
  flex: 1;
  border: none;
  padding: 10px;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  background-color: #f5f5f5;
  margin-right: 10px;
}

.send-button,
.adjuntos,
.microfono {
  width: 35px;
  height: 35px;
  cursor: pointer;
  margin-left: 10px;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
