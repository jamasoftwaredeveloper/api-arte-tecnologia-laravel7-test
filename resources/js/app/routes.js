import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "./Home";
import Dashboard from "./components/dashboard";
import register from './components/auth/register';
import login from './components/auth/login';

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name: "home",
        component:Home
    },
    {
        path:"/login",
        name: "login",
        component:login
    },
    ,{
        path: '/register',
        name: 'register',
        component: register
    },
    {
        path:"/dashboard",
        name: "dashboard",
        component:Dashboard
    }
];

const router = new VueRouter({
    routes,
    mode:"history"
});

export default router;