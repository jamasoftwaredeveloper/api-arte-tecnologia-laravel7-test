<template>
    <div class="container">
        <div v-if="loading">
            <br /><br />
            <div class="d-flex justify-content-center text-success">
                <div class="spinner-border" role="status text-success">
                    <span class="sr-only"></span>
                </div>
            </div>
            <br />
        </div>

        <div class="card" v-else="">
            <div class="card-header bg-success text-white">
                Login
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-2" v-if="alert">
                        <div :class="classAlert" role="alert" style="font-size: 14px;">
                            {{ message }}
                        </div>
                    </div>
                </div>
                <form autocomplete="off" @submit.prevent="login" method="post">
                    <div class="form-group">
                        <label for="email"><b>E-mail</b></label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com"
                            v-model="user.email" required />
                    </div>
                    <div class="form-group">
                        <label for="password"><b>Contraseña</b></label>
                        <input type="password" id="password" class="form-control" v-model="user.password"
                            placeholder="******" required />
                    </div>
                    <button type="submit" class="btn btn-success btn-block">Ingresar</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script src="./login.js"></script>
<style src="./styles.css" scoped></style>