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
                    <v-col cols="6" sm="3" md="2" v-for="(record, index) in payload.records" :key="index">
                        <NewRecord :index="index"></NewRecord>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="onSubmit()" :disabled="!frmValid || payload.records.length === 0">Criar registro</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NewRecord from './NewRecord'
import API from '@/api/report'

export default {
    name: 'NewReport',
    props: ['id'],
    components: {
        NewRecord
    },
    data () {
        return {
            frmValid: true,
            dateActivator: false,
            payload: {
                id: null,
                date: '',
                obs: '',
                records: []
            }
        }
    },
    computed: {
        ...mapGetters(['report', 'activeAccount']),
        formattedDate () {
            return this.$options.filters.toBRDate(this.payload.date)
        }
    },
    created () {
        let date = this.$options.filters.toISODate(new Date())

        if (this.id) {
            const report = this.activeAccount.reports.find(rep => rep.id === this.id)
            date = this.$options.filters.toISODate(report.date)
            this.setReport(report)
        }

        this.payload = this.report
        this.payload.date = date
        if (this.payload.records.length === 0) this.onAddTime()
    },
    methods: {
        ...mapActions(['addRecord', 'updateReports', 'setReport']),
        onAddTime () {
            this.addRecord((new Date()).toLocaleTimeString().replace(/:\d\d$/, ''))
        },
        onSubmit () {
            this.payload.accountId = this.activeAccount.id
            this.setLoading(true)

            API.upsert(this.payload)
                .then(({ data }) => {
                    const reportResponse = data.data.report
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.updateReports(reportResponse)
                    }

                    this.setLoading(false)
                    this.$goHome()
                })
                .catch(this.$throwException)
        }
    }
}
</script>
