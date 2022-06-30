import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@fortawesome/fontawesome-free/js/fontawesome.min.js'
import '@fortawesome/fontawesome-free/js/solid.min.js'

createApp(App).use(router).mount('#app')

// Prototypes

Object.defineProperty(Array.prototype, 'shuffle', {
  value: function() {
      for (let i = this.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this[i], this[j]] = [this[j], this[i]];
      }
      return this;
  }
});