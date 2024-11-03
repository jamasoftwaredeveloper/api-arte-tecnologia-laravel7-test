<template>
    <div>
        <nav class="navbar navbar-dark bg-primary navbar-expand-lg navbar-expand-xs navbar-expand-sm">
            <a class="navbar-brand pl-2" href="#"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link text-white" :to="{ name: 'dashboard' }" v-if="$store.state.autorized">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-white" :to="{ name: 'login' }" v-if="!$store.state.autorized">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link text-white" :to="{ name: 'register' }" v-if="!$store.state.autorized">Registro</router-link>
                </li>
              </ul>
            </div>
            <span class="navbar-text">
                <a class="btn btn-primary btn-sm text-white " @click="logout" v-if="$store.state.autorized"><fa icon="fa-solid fa-right-from-bracket" /> Logout</a>
            </span>
          </nav>

        <div class="card-body">
            <br/>
            <router-view></router-view>
        </div>
    </div>
</template>
<script src="./app.js"></script>

<style scoped>
    @import '~bootstrap/dist/css/bootstrap.css';
</style>
