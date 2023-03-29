import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Payments from './components/Payments.vue';

const options = {
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/payments', component: Payments },
    ]
}

export const router = createRouter(options)