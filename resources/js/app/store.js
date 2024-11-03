import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem("authToken") || "",
        autorized: localStorage.getItem("authToken") ? true : false,
        user: localStorage.getItem("user") || "",
        configData: null,
        loading: false,
    },
    mutations: {
        setLoading(state, loading) {
            state.loading = loading;
        },
        setToken(state, token) {
            localStorage.setItem("authToken", token);
            state.token = token;
        },
        setUser(state, name) {
            state.user = name;
        },
        setAutorized(state, status) {
            state.autorized = status;
        },
        clearToken(state) {
            localStorage.removeItem("authToken");
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
        }
    },
    getters: {
        getConfig: (state) => state.configData,
    },
});
