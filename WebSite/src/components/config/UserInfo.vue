<template>
    <v-card flat>
        <v-card-text>
            <v-form v-model="frmValid">
                <v-row wrap>
                    <v-col xs="12" sm="6" md="3">
                        <v-text-field
                        label="Nome"
                        v-model="payload.name"
                        :rules="$rules.required"
                        ></v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6" md="3">
                        <v-text-field
                        label="Sobrenome"
                        v-model="payload.lastname"
                        :rules="$rules.required"
                        ></v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6" md="4">
                        <v-text-field
                        label="Email"
                        v-model="payload.email"
                        :rules="[...$rules.required, ...$rules.email]"
                        ></v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6" md="2">
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
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/config'

export default {
    name: 'UserInfo',
    data () {
        return {
            frmValid: true,
            birthActivator: false,
            payload: {
                id: '',
                name: '',
                lastname: '',
                email: '',
                birth: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters(['user']),
        formattedBirthDate () {
            return this.$options.filters.toBRDate(this.payload.birth)
        }
    },
    created () {
        this.payload = { ...this.user }
    },
    methods: {
        ...mapActions(['setUser']),
        onSubmit (evt) {
            this.setLoading(true)

            API.updateUser(this.payload)
                .then(({ data }) => {
                    const userResponse = data.data.user

                    if (userResponse && userResponse.id) {
                        this.$auth.setItem('user', userResponse)
                        this.setUser(userResponse)
                    }

                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        }
    }
}
</script>
