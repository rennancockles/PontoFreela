<template>
    <v-card flat>
        <v-card-text>
            <v-form v-model="frmValid">
                <v-row wrap>

                    <v-col cols="12" sm="4">
                        <v-text-field
                        label="Senha Atual"
                        name="currentPassword"
                        v-model="payload.currentPassword"
                        :append-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="showCurrentPassword = !showCurrentPassword"
                        :type="showCurrentPassword ? 'text' : 'password'"
                        :rules="$rules.required"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
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

                    <v-col cols="12" sm="4">
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
            <v-btn color="primary" @click="onSubmit($event)" :disabled="!frmValid">Salvar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import API from '@/api/user'

export default {
    name: 'UserInfo',
    data () {
        return {
            frmValid: true,
            showPassword: false,
            showCurrentPassword: false,
            showPasswordConfirm: false,
            payload: {
                password: '',
                currentPassword: '',
                passwordConfirm: ''
            }
        }
    },
    methods: {
        onSubmit (evt) {
            this.setLoading(true)

            API.changePassword(this.payload)
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
