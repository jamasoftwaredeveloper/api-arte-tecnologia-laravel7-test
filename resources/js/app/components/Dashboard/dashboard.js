import axios from "axios";
import configService from "../../utils/configService";
import { mapActions, mapGetters } from "vuex";
import { componentDataStructure } from "./dataStructure";
export default {
    name: "Dashboard",
    components: {},
    computed: {
        ...mapGetters(["getConfig"]), // Usa el getter para acceder a configData
    },
    data() {
        return {
            ...componentDataStructure,
            token: this.$store.state.token,
        };
    },
    created() {
        this.getCurrencyCodes();
        this.fetchConfig();
        // this.$store.dispatch('checkToken',this.$store.state.token);
    },
    mounted() {

       this.checkToken();
    },
    // https://dolarapi.com/docs/
    methods: {
        ...mapActions(["fetchConfig"]),
        async getCurrencyCodes() {
            try {
                this.loading = true;
                const response = await axios.post("/api/v1/getCurrecyCodes", {
                    token: this.token,
                });
                console.log("response", response);

                this.codes = response.data;
            } catch (error) {
                console.error("Error al obtener códigos de moneda", error);
            } finally {
                this.loading = false;
            }
        },
        async checkToken() {
            try {
                if (this.$store.state.token !== "") {
                    const response = await configService.post(
                        "/api/v1/checkToken",
                        {
                            token: this.token,
                        }
                    );
                    if (!response.data.error) {
                        this.$router.push("/dashboard");
                    } else {
                        this.$store.commit("setToken", response.data.token);
                    }
                } else {
                    this.$router.push("/login");
                }
            } catch (error) {
                this.$router.push("/login");
            } finally {
                this.loading = false;
            }
        },
        async currencyConversion() {
            try {
                this.loading = true;
                const url = this.$store.state.configData.API_URL_CURRENCY;
                const apiKey = this.$store.state.configData.API_KEY;
                const response = await configService.get(
                    `${url}${apiKey}&base=${this.base}&target=${this.target}&baseAmount=${this.baseAmount}`
                );
                this.valueConversion =
                    response.data.exchange_rates[this.target];
            } catch (error) {
                console.error("Error en la conversión de moneda", error);
            } finally {
                this.loading = false;
            }
        },
        clearFilter() {
            this.target = "";
            this.base = "";
            this.baseAmount = "";
            this.valueConversion = "";
        },
    },
};
