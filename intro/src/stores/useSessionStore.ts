// src\stores\useSessionStore.ts

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  jsonContent: Record<string, any>;
  isReceived: boolean;
}

interface Session {
  sessionKey: string;
  messages: Message[];
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: {} as Record<string, Session>,
    currentSessionKey: '' as string,
    isWelcomeVisible: true, // Estado para controlar la visibilidad del mensaje de bienvenida
  }),
  actions: {
    createSession() {
      const newSessionKey = uuidv4();
      this.sessions[newSessionKey] = { sessionKey: newSessionKey, messages: [] };
      this.currentSessionKey = newSessionKey;
      localStorage.setItem('currentSessionKey', newSessionKey);
      this.isWelcomeVisible = true; // Mostrar mensaje de bienvenida al crear una nueva sesión
    },
    loadSessionKey() {
      const storedSessionKey = localStorage.getItem('currentSessionKey');
      if (storedSessionKey && this.sessions[storedSessionKey]) {
        this.currentSessionKey = storedSessionKey;
      } else {
        this.createSession();
      }
    },
    switchSession(sessionKey: string) {
      if (this.sessions[sessionKey]) {
        this.currentSessionKey = sessionKey;
        localStorage.setItem('currentSessionKey', sessionKey);
        this.isWelcomeVisible = false; // Ocultar el mensaje de bienvenida al cambiar de sesión
      }
    },
    addMessage(message: Message) {
      if (this.currentSessionKey) {
        this.sessions[this.currentSessionKey].messages.push(message);
        this.isWelcomeVisible = false; // Ocultar el mensaje de bienvenida al agregar un mensaje
      }
    },
    getMessages() {
      return this.currentSessionKey ? this.sessions[this.currentSessionKey].messages : [];
    },
    clearMessages() {
      if (this.currentSessionKey) {
        this.sessions[this.currentSessionKey].messages = [];
      }
    },
    getSessionKeys() {
      return Object.keys(this.sessions);
    },
    resetWelcomeVisibility() {
      this.isWelcomeVisible = true; // Restablecer la visibilidad del mensaje de bienvenida
    },
    hideWelcome() {
      this.isWelcomeVisible = false; // Ocultar el mensaje de bienvenida
    },
  },
});
