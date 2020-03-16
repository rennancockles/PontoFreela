<template>
    <v-card flat>
        <v-card-title class="primary white--text title">
            NOVO REGISTRO
        </v-card-title>

        <v-card-text>
            <v-form v-model="frmValid">
                <v-row wrap>
                    <v-col xs="12" sm="6" md="2">
                        <v-menu
                        ref="dateActivator"
                        v-model="dateActivator"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                :value="formattedDate"
                                label="Data"
                                :rules="$rules.required"
                                readonly
                                v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                            no-title
                            v-model="payload.date"
                            locale="pt-br"
                            color="secondary"
                            @input="dateActivator = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col xs="12" sm="6" md="10">
                        <v-text-field
                        label="Observações"
                        v-model="payload.obs"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <p class="title primary--text">
                    HORÁRIOS
                    <span>
                        <v-btn small class="success mb-1" icon @click="onAddTime()">
                            <v-icon color="white">mdi-plus</v-icon>
                        </v-btn>
                    </span>
                </p>

                <v-row wrap>
                    <v-col cols="6" sm="3" md="2" v-for="(time, index) in payload.times" :key="index">
                        <NewTime :id="index"></NewTime>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="onSubmit()" :disabled="!frmValid || payload.times.length === 0">Criar registro</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NewTime from './NewTime'
import API from '@/api/report'

export default {
    name: 'NewReport',
    components: {
        NewTime
    },
    data () {
        return {
            frmValid: true,
            dateActivator: false,
            payload: {
                date: '',
                obs: '',
                times: []
            }
        }
    },
    computed: {
        ...mapGetters(['record']),
        formattedDate () {
            return this.$options.filters.toBRDate(this.payload.date)
        }
    },
    created () {
        this.payload = this.record
        this.payload.date = (new Date()).toISOString().replace(/T.*/, '')
        if (this.payload.times.length === 0) this.onAddTime()
    },
    methods: {
        ...mapActions(['addTime']),
        onAddTime () {
            this.addTime((new Date()).toLocaleTimeString().replace(/:\d\d$/, ''))
        },
        onSubmit () {
            this.setLoading(true)

            API.upsert(this.payload)
                .then(({ data }) => {
                    const reportResponse = data.data.report

                    console.log(reportResponse)

                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        }
    }
}
</script>
