import axios from "axios";
export default {
  name: "Dashboard",
  components: {
  },
  data() {
    return {
      loading: false,
      resultData: [],
      codes: [],
      target: "",
      base: "",
      base_amount: "",
      value_conversion: "",
      nameError: false,
      emailError: false,
      config: null,
    };
  },
  created() {
    this.getCurrencyCodes();
    this.fetchConfig();
  },
  mounted() {   
    this.checkToken();   
  },
  // https://dolarapi.com/docs/
  methods: {
    async getCurrencyCodes() {
      try {
        this.loading = true;
        const response = await axios.post("/api/v1/getCurrecyCodes", {
          token: this.$store.state.token,
        });
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
          const response = await axios.post("/api/v1/checkToken", {
            token: this.$store.state.token,
          });
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
        const url = this.config.API_URL_CURRENCY;
        const api_key = this.config.API_KEY;
        const response = await axios.get(
          `${url}${api_key}&base=${this.base}&target=${this.target}&base_amount=${this.base_amount}`
        );
        this.value_conversion = response.data.exchange_rates[this.target];
      } catch (error) {
        console.error("Error en la conversión de moneda", error);
      } finally {
        this.loading = false;
      }
    },
    clearFilter() {
      this.target = "";
      this.base = "";
      this.base_amount = "";
      this.value_conversion = "";
    },
    fetchConfig() {
      axios.get('/api/v1/config')
        .then(response => {
          this.config = response.data;
        })
        .catch(error => {
          console.error('Error fetching config:', error);
        });
    },
  },
};
