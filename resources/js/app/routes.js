import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "./components/Dashboard/index.vue";
import Register from "./components/auth/register/index.vue";
import Login from "./components/auth/login/index.vue";
import Home from "./Home.vue";
import configService from "./utils/configService"; // Asegúrate de que esta configuración tenga el token configurado
import http from "./utils/http";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
];

const router = new VueRouter({
    mode: "hash",
    routes,
});

// Configura el guard de navegación `beforeEach`
router.beforeEach(async (to, from, next) => {
    // Verifica si la ruta requiere autenticación
    if (to.matched.some((record) => record.meta && record.meta.requiresAuth)) {
        const token = localStorage.getItem("authToken"); // Obtén el token del localStorage
        if (!token) {
            console.log("Token no encontrado. Redirigiendo a login.");
            next({ name: "login" }); // Redirige a la página de login
        } else {
            try {
                // Realiza la solicitud para verificar el token
                const result = await http.post("/api/v1/checkToken", {
                    token,
                });

                // Verifica la respuesta del servidor
                if (result.data.original.success) {
                    // Si el token es válido, permite el acceso a la ruta
                    next(); // Continúa a la ruta solicitada (dashboard)
                } else {
                    console.log("Token inválido. Redirigiendo a login.");
                    localStorage.removeItem("authToken"); // Elimina el token inválido
                    next({ name: "login" }); // Redirige a la página de login
                }
            } catch (error) {
                console.error("Error al verificar el token:", error);
                // Maneja el error si la solicitud falla
                localStorage.removeItem("authToken"); // Elimina el token en caso de error
                next({ name: "login" }); // Redirige a la página de login
            }
        }
    } else {
        // Si la ruta no requiere autenticación, permite el acceso
        next(); // Continúa a la ruta solicitada
    }
});

export default router;
