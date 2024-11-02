import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem("auth") || "",
        autorized: localStorage.getItem("auth") ? true : false,
        user: localStorage.getItem("user") || "",
        config: null,
    },
    mutations: {
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
        setConfig(state, config) {
            state.config = config;
        },
    },
    actions: {
        fetchConfig({ commit }) {
            return axios.get("/api/v1/config")
                .then((response) => {
                    commit("setConfig", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching config:", error);
                });
        },
    },
    getters: {
        getConfig: state => state.config,
      },
});
