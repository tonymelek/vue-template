import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Payment from "./components/Payment.vue"
const options = {
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/payment', component: Payment },
    ]
}

export const router = createRouter(options)