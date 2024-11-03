import http from "./utils/http";
import router from "./routes"; // Asegúrate de que esta línea sea correcta
export default {
    name: "App",
    methods: {
        logout() {
            http.post("/api/v1/logout", { token: this.$store.state.token })
                .then((response) => {
                    this.$store.commit('clearToken');
                    this.$store.commit('setAutorized', false);
                    this.$router.push("/login");
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    router.push("/login");
                    console.log('test');
                });
        }
    },
}