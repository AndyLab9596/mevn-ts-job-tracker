import { createApp, markRaw } from 'vue';
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
import BaseSpinner from './components/ui/BaseSpinner.vue';
import DashboardContent from './components/layout/DashboardContent.vue';
import BaseSelectFormField from './components/ui/BaseSelectFormField.vue';

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VeeValidatePlugin);
app.component(VueFeather.name, VueFeather);
app.component('BaseButtonLink', BaseButtonLink);
app.component('BaseInputFormField', BaseInputFormField);
app.component('BaseSelectFormField', BaseSelectFormField);
app.component('BaseButton', BaseButton);
app.component('BaseAlert', BaseAlert);
app.component('BaseSpinner', BaseSpinner);
app.component('DashboardContent', DashboardContent);
app.mount('#app');
