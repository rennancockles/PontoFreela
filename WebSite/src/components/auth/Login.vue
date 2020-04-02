<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card id="login-card">
                <v-card-title class="primary white--text title">
                    LOGIN
                </v-card-title>

                <v-card-text>
                    <v-form>
                        <v-text-field
                        prepend-icon="mdi-account"
                        name="email"
                        label="Email"
                        v-model="payload.email"
                        ></v-text-field>

                        <v-text-field
                        label="Senha"
                        name="password"
                        prepend-icon="mdi-lock"
                        v-model="payload.password"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'"
                        @keyup.enter="onSubmit()"
                        ></v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <div class="ml-3">
                        <p class="caption mb-0">
                            Esqueceu sua senha?
                            <a href="" @click.prevent="recover()">Recupere</a>
                        </p>
                        <p class="caption mb-0">
                            Não possui conta?
                            <router-link tag="a" to="/auth/register">Cadastre-se</router-link>
                        </p>
                    </div>
                    <v-spacer />
                    <v-btn type="button" @click="onSubmit()" color="primary">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/auth'

export default {
    name: 'AuthLogin',
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
    data () {
        return {
            showPassword: false,
            payload: {
                email: '',
                password: ''
            }
        }
    },
    created () {
        this.setIsLoggedIn(this.$auth.isLoggedIn())
        if (this.isLoggedIn) this.$goHome()
    },
    methods: {
        ...mapActions(['logIn', 'setIsLoggedIn']),
        onSubmit (evt) {
            this.setLoading(true)

            API.login(this.payload)
                .then(({ data }) => {
                    this.logIn(data.data.login)
                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        },
        recover () {
            if (!this.payload.email || this.payload.email === '') {
                this.$message('O campo email precisa estar preenchido')
            } else if ((!/.+@.+\..+/.test(this.payload.email))) {
                this.$message('E-mail inválido')
            } else {
                this.$message('Um e-mail será enviado com as informações para recuperar a senha', 'info')

                this.setLoading(true)

                API.recover(this.payload.email)
                    .then(({ data }) => {
                        this.setLoading(false)
                        this.$goHome()
                    })
                    .catch(this.$throwException)
            }
        }
    }
}
</script>
