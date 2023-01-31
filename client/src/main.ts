import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import VeeValidatePlugin from '@/includes/validation';
import BaseButtonLink from '@/components/ui/BaseButtonLink.vue';
import BaseInputFormField from '@/components/ui/BaseInputFormField.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseAlert from './components/ui/BaseAlert.vue';
import VueFeather from 'vue-feather';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VeeValidatePlugin);
app.component(VueFeather.name, VueFeather);
app.component('BaseButtonLink', BaseButtonLink);
app.component('BaseInputFormField', BaseInputFormField);
app.component('BaseButton', BaseButton);
app.component('BaseAlert', BaseAlert);
app.mount('#app');
