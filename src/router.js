import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";

const options = {
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
    ]
}

export const router = createRouter(options)