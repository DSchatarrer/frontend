// src/stores/useSessionStore.ts

import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  jsonContent: Record<string, any>;
  isReceived: boolean;
}

interface Conversation {
  sessionKey: string;
  messages: Message[];
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    conversations: [] as Conversation[],
    currentSessionKey: '',
  }),
  actions: {
    createSessionKey() {
      const newSessionKey = uuidv4();
      const newConversation: Conversation = {
        sessionKey: newSessionKey,
        messages: [],
      };
      this.conversations.push(newConversation);
      this.currentSessionKey = newSessionKey;
      localStorage.setItem('currentSessionKey', newSessionKey);
      this.clearMessages();
    },
    loadSessionKey() {
      const storedSessionKey = localStorage.getItem('currentSessionKey');
      if (storedSessionKey) {
        this.currentSessionKey = storedSessionKey;
      } else {
        this.createSessionKey();
      }
    },
    switchSession(sessionKey: string) {
      const conversation = this.conversations.find(conv => conv.sessionKey === sessionKey);
      if (conversation) {
        this.currentSessionKey = sessionKey;
        localStorage.setItem('currentSessionKey', sessionKey);
      }
    },
    addMessage(message: Message) {
      const conversation = this.conversations.find(conv => conv.sessionKey === this.currentSessionKey);
      if (conversation) {
        conversation.messages.push(message);
      }
    },
    clearMessages() {
      const conversation = this.conversations.find(conv => conv.sessionKey === this.currentSessionKey);
      if (conversation) {
        conversation.messages = [];
      }
    },
    getCurrentMessages(): Message[] {
      const conversation = this.conversations.find(conv => conv.sessionKey === this.currentSessionKey);
      return conversation ? conversation.messages : [];
    },
  },
});
