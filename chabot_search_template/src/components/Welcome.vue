<template>
  <div v-if="props.isWelcomeVisible" class="welcome-message">
    <h2>Bienvenido al Chat</h2>
    <p>Estamos aquí para ayudarte. Escribe tu mensaje para empezar.</p>
  </div>
</template>

<script setup lang="ts">
// Definición de la prop isWelcomeVisible
const props = defineProps({
  isWelcomeVisible: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.welcome-message {
  text-align: center;
  margin-top: 20px;
  color: #333;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
}
</style>
