<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
            <v-card id="login-card">
                <v-card-title class="primary white--text title">
                    RECUPERAÇÂO DE SENHA
                </v-card-title>

                <v-card-text>
                    <v-form v-model="frmValid">
                        <v-row wrap>
                            <v-col cols="12">
                                <v-text-field
                                name="email"
                                label="Email"
                                v-model="payload.email"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                label="Nova Senha"
                                name="password"
                                v-model="payload.password"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="$rules.required"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                label="Confirmar Nova Senha"
                                name="passwordConfirm"
                                v-model="payload.passwordConfirm"
                                :append-icon="showPasswordConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="showPasswordConfirm = !showPasswordConfirm"
                                :type="showPasswordConfirm ? 'text' : 'password'"
                                :rules="[...$rules.required, equalPasswords]"
                                @keyup.enter="onSubmit()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn color="danger" @click="$goHome()" dark>Cancelar</v-btn>
                    <v-btn color="primary" @click="onSubmit($event)" :disabled="!frmValid">Recuperar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/auth'

export default {
    name: 'Recover',
    props: ['token'],
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
    data () {
        return {
            frmValid: true,
            showPassword: false,
            showPasswordConfirm: false,
            payload: {
                email: '',
                password: '',
                passwordConfirm: ''
            }
        }
    },
    created () {
        this.setIsLoggedIn(this.$auth.isLoggedIn())
        if (this.isLoggedIn || !this.token) this.$goHome()
    },
    methods: {
        ...mapActions(['setIsLoggedIn']),
        onSubmit (evt) {
            this.payload.token = this.token
            this.setLoading(true)

            API.recover(this.payload)
                .then(() => {
                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        },
        equalPasswords (v) {
            return v === this.payload.password || 'As senhas devem ser iguais!'
        }
    }
}
</script>
