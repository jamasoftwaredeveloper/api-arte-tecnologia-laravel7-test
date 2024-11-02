
import configService from "../../../utils/configService";
import { componentDataStructure } from "./dataStructure";
export default {
    name: "Login",
    data() {
        return {
            ...componentDataStructure,
            user: {
                email: "admin@test.com",
                password: "123456789",
            },
        };
    },
    mounted() {
        if (this.$store.state.token !== "") {
            configService
                .post("/api/v1/checkToken", { token: this.$store.state.token })
                .then((response) => {
                    if (response) {
                        this.loading = false;
                        this.$router.push("/dashboard");
                    }
                })
                .catch((error) => {
                    this.loading = false;
                    this.$store.commit("clearToken");
                });
        } else {
            this.loading = false;
            this.$store.state.token = "";
        }
    },
    methods: {
        login() {
            this.loading = true;
            configService
                .post("/api/v1/login", this.user)
                .then((response) => {
                    this.loading = false;
                    this.alert = true;
                    this.message = response.message;
                    this.classAlert = response.classAlert;
                    this.$store.commit("setToken", response.data[0]);
                    this.$store.commit("setUser", response.data[1]);
                    localStorage.setItem("user", response.data[1]);
                    this.$store.commit("setAutorized", true);
                    this.$router.push("/dashboard");
                })
                .catch((error) => {
                    this.loading = false;
                    this.alert = true;
                    this.message = error.response.data.message;
                    this.classAlert = error.response.data.class;
                });
        },
    },
};
