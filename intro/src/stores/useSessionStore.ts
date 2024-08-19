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
  }),
  actions: {
    createSession() {
      const newSessionKey = uuidv4();
      this.sessions[newSessionKey] = { sessionKey: newSessionKey, messages: [] };
      this.currentSessionKey = newSessionKey;
      localStorage.setItem('currentSessionKey', newSessionKey);
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
      }
    },
    addMessage(message: Message) {
      if (this.currentSessionKey) {
        this.sessions[this.currentSessionKey].messages.push(message);
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
    }
  },
});
