import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { registerPlugins } from '@/plugins';

createApp(App)
  .use(router)
  .use(vuetify)
  .use(registerPlugins) 
  .mount('#app');
