import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem("auth") || "",
        autorized: localStorage.getItem("auth") ? true : false,
        user: localStorage.getItem("user") || "",
        configData: null,
        loading: false,
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },
        setToken(state, token) {
            localStorage.setItem("auth", token);
            state.token = token;
        },
        setUser(state, name) {
            state.user = name;
        },
        setAutorized(state, status) {
            state.autorized = status;
        },
        clearToken(state) {
            localStorage.removeItem("auth");
            state.token = "";
            state.user = "";
            state.autorized = "";
        },
        setConfig(state, configData) {
            state.configData = configData;
        },
    },
    actions: {
        fetchConfig({ commit }) {
            return axios
                .get("/api/v1/config")
                .then((response) => {
                    commit("setConfig", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching config:", error);
                });
        },
        async checkToken({ state, commit, dispatch }, token) {
            console.log("state",state);
            console.log("token1",token);
            console.log("commit1",commit);
            if (state.token) {
                
                commit("setLoading", true);
                try {
                    const response = await axios.post(
                        "/api/v1/checkToken",
                        { token: state.token }
                    );
                    if (response) {

                        
                        commit("setLoading", false);
                        this.$router.push("/dashboard");
                        // Aquí puedes redirigir a la ruta que desees
                    }
                } catch (error) {
                    commit("setLoading", false);
                    commit("clearToken");
                }
            } else {
                commit("setLoading", false);
                commit("clearToken");
            }
        },
    },
    getters: {
        getConfig: (state) => state.configData,
    },
});
