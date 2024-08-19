import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionKey: localStorage.getItem('sessionKey') || '',
  }),
  actions: {
    createSessionKey() {
      const newSessionKey = uuidv4();
      this.sessionKey = newSessionKey;
      localStorage.setItem('sessionKey', newSessionKey);
    },
    loadSessionKey() {
      const storedSessionKey = localStorage.getItem('sessionKey');
      if (storedSessionKey) {
        this.sessionKey = storedSessionKey;
      } else {
        this.createSessionKey();
      }
    }
  },
});
