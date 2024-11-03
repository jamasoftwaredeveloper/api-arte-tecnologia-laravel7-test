import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./components/Dashboard/index.vue";
import Register from "./components/auth/register/index.vue";
import Login from "./components/auth/login/index.vue";
import Home from "./Home.vue";
import configService from "./utils/configService";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    ,
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;
