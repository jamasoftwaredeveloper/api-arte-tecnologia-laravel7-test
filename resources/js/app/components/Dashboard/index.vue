<template>
    <div class="container">
        <div class="card" v-if="$store.state.token">
            <div class="card-header success">
                <fa icon="fas fa-exchange" /> Convertir moneda
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2">
                        <label><b>Monto base (*)</b></label>
                        <input class="form-control" v-model="baseAmount" placeholder="23" type="number"/>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-3" v-if="baseAmount">
                        <label><b>Moneda base (*)</b></label>
                        <v-select :options="codes" :reduce="code => code.value" v-model="base"
                            placeholder="Bitcoin Cash" />
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-3" v-if="base">
                        <label><b>Moneda objetivo (*)</b></label>
                        <v-select :options="codes" :reduce="code => code.value" placeholder="Canadian Dollar"
                            v-model="target" />
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" v-if="valueConversion">
                        <label><b>Resultado</b></label><br />
                        <p class="text-success"><b>{{ target }}</b> : {{ valueConversion }}</p>
                    </div>
                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-2" v-if="target">
                        <label><b>Convertir</b></label><br />
                        <button class="btn btn-success btn-sm" @click="currencyConversion">Convertir</button>
                        <button class="btn btn-secondary btn-sm" @click="clearFilter">Limpiar</button>
                    </div>
                </div>
            </div>
            <div v-if="loading">
                <br /><br />
                <div class="d-flex justify-content-center text-success">
                    <div class="spinner-border" role="status text-success">
                        <span class="sr-only"></span>
                    </div>
                </div>
                <br />
            </div>
        </div>
    </div>
</template>

<script src="./dashboard.js"></script>
<style src="./dashboard.css" scoped></style>