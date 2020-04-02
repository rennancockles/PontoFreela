<template>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8">
            <v-card id="login-card">
                <v-card-title class="primary white--text title">
                    CADASTRO
                </v-card-title>

                <v-card-text>
                    <v-form v-model="frmValid">
                        <v-row wrap>
                            <v-col xs="12" sm="6" md="4">
                                <v-text-field
                                label="Nome"
                                v-model="payload.name"
                                :rules="$rules.required"
                                ></v-text-field>
                            </v-col>
                            <v-col xs="12" sm="6" md="4">
                                <v-text-field
                                label="Sobrenome"
                                v-model="payload.lastname"
                                :rules="$rules.required"
                                ></v-text-field>
                            </v-col>
                            <v-col xs="12" sm="6" md="4">
                                <v-menu
                                ref="birthActivator"
                                v-model="birthActivator"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        :value="formattedBirthDate"
                                        label="Data de Nascimento"
                                        :rules="$rules.required"
                                        readonly
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    no-title
                                    v-model="payload.birth"
                                    locale="pt-br"
                                    color="secondary"
                                    @input="birthActivator = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col xs="12" sm="6">
                                <v-text-field
                                label="Email"
                                v-model="payload.email"
                                :rules="[...$rules.required, ...$rules.email]"
                                ></v-text-field>
                            </v-col>
                            <v-col xs="12" sm="6">
                                <v-text-field
                                label="Nome da Empresa"
                                v-model="payload.company"
                                ></v-text-field>
                            </v-col>
                            <v-col xs="12" sm="6">
                                <v-text-field
                                label="Senha"
                                name="password"
                                v-model="payload.password"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="$rules.required"
                                ></v-text-field>
                            </v-col>
                            <v-col xs="12" sm="6">
                                <v-text-field
                                label="Confirmar Senha"
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
                    <v-btn color="danger" @click="onCancel" dark>Cancelar</v-btn>
                    <v-btn color="primary" @click="onSubmit($event)" :disabled="!frmValid">Cadastrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/auth'

export default {
    name: 'Register',
    data () {
        return {
            frmValid: true,
            showPassword: false,
            showPasswordConfirm: false,
            birthActivator: false,
            payload: {
                name: '',
                lastname: '',
                email: '',
                birth: '',
                password: '',
                passwordConfirm: '',
                company: ''
            }
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        formattedBirthDate () {
            return this.$options.filters.toBRDate(this.payload.birth)
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

            API.register(this.payload)
                .then(({ data }) => {
                    this.logIn(data.data.login)
                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        },
        onCancel () {
            this.$goHome()
        },
        equalPasswords (v) {
            return v === this.payload.password || 'As senhas devem ser iguais!'
        }
    }
}
</script>
