
import http from "../../../utils/http";
import { ComponentDataStructure } from "./dataStructure";

export default {
    name: "Login",
    data() {
        return {
            ...ComponentDataStructure,
            user: {
                email: "admin@test.com",
                password: "123456789",
            },
        };
    },
    methods: {
        login() {
            this.loading = true;
            http
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
                    console.log("error",error);
                    this.loading = false;
                    this.alert = true;
                    this.message = error.response.data.message;
                    this.classAlert = error.response.data.class;
                });
        },
    },
};
