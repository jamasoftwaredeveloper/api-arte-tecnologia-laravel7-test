
<template>
    <div class="container">
        <div class="card" v-if="this.$store.state.token">
            <div class="card-header success">
                <fa icon="fas fa-exchange" /> Convertir moneda
              </div>
            <div class="card-body">
                <div class="row">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2">
                    <label><b>Monto base (*)</b></label>
                    <input class="form-control" v-model="base_amount" placeholder="23" type="number"/>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-3" v-if="base_amount">
                    <label><b>Moneda base (*)</b></label>
                    <v-select  :options="codes"  :reduce="code => code.value"  v-model="base" placeholder="Bitcoin Cash"></v-select>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-3" v-if="base" >
                    <label><b>Moneda objectivo (*)</b></label>
                    <v-select  :options="codes"  :reduce="code => code.value"  placeholder="Canadial Dollar"  v-model="tarjet"></v-select>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" v-if="value_conversion">
                    <label><b>Resultado</b></label><br>
                    <p class="text-success"><b>{{tarjet}}</b> : {{value_conversion}}</p>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" v-if="tarjet">
                    <label><b>Convertir</b></label><br/>
                    <button class="btn btn-success btn-sm" @click="currencyConversion">Convertir</button>
                    <button class="btn btn-secondary btn-sm" @click="clearFilter">Limpiar</button>
                </div>
            </div>
            </div>
            <div v-if="loading">
                <br/><br/>
                <div class="d-flex justify-content-center text-success">
                    <div class="spinner-border" role="status text-success">
                      <span class="sr-only"></span>
                    </div>
                  </div>
                  <br/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default{
    name:"Dashboard",
    data () {
        return {

            loading:false,
            resultData:[],
            codes:[],
            tarjet:"",
            base:"",
            base_amount:"",
            value_conversion:""

        }
    },
    created() {
        this.getCurrencyCodes();
    },
    mounted(){
        if (this.$store.state.token !== '') {
            axios
            .post("/api/v1/checkToken",{token:this.$store.state.token})
            .then((response) => {
                if(response.data.error ==false){
                    this.loading = false;
                    this.$router.push("/dashboard");

                }else{
                    this.$store.commit('setToken',response.data.token);
                }
        })
        .catch((error) => {
          this.loading = false;
          this.$router.push("/login");
        });
        }else{
            this.loading = false;
            this.$router.push("/login");
        }
    },

    methods: {
        getCurrencyCodes(){
            this.errors ={};
                this.loading = true;
                axios
                    .post('/api/v1/getCurrecyCodes',{token:this.$store.state.token})
                    .then((response) => {
                        this.codes = response.data
                        this.loading = false;
                    })
                    .catch((error) => {

                        this.loading= false;
                        this.classAlert= error.response.data.class;
                        this.message = error.response.data.execution_status;
                        this.errors = error.response.data.data;
                        console.log("this.errors ",this.errors );
                    });

        },
        currencyConversion(){

                this.errors ={};
                this.loading = true;
                axios
                    .get('https://exchange-rates.abstractapi.com/v1/live/?api_key=b03903208ddd42219219400ab117cd61&base='+this.base+'&target='+this.tarjet+'&base_amount='+this.base_amount )
                    .then((response) => {

                        this.value_conversion = response.data.exchange_rates[this.tarjet]
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.loading= false;
                        console.log("this.errors ",this.errors );
                    });
                // }
        },
        clearFilter(){

            this.tarjet="";
            this.base="";
            this.base_amount="";
            this.value_conversion="";
        }
    },
}
</script>
<style scoped>
.card-header {
        background-color: #198754;
        color: white !important;

}
.label-control{
    font-size: 13px;
}

</style>
