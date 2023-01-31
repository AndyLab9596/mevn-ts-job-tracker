import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import BaseButtonLink from "@/components/ui/BaseButtonLink.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("BaseButtonLink", BaseButtonLink);
app.mount("#app");
