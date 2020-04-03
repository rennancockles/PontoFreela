<template>
    <div>
        <v-form @submit.prevent="getReports">
            <v-row>
                <v-col cols="12" sm="6" md="2">
                    <v-menu
                    ref="dateFromActivator"
                    v-model="dateFromActivator"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            :value="formattedDateFrom"
                            label="Data Inicial"
                            :rules="$rules.required"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        no-title
                        v-model="filter.dateFrom"
                        locale="pt-br"
                        color="secondary"
                        @input="dateFromActivator = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                    <v-menu
                    ref="dateToActivator"
                    v-model="dateToActivator"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            :value="formattedDateTo"
                            label="Data Final"
                            :rules="$rules.required"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                        no-title
                        v-model="filter.dateTo"
                        locale="pt-br"
                        color="secondary"
                        @input="dateToActivator = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>

                <v-spacer></v-spacer>

                <v-col cols="12" sm="6" md="3">
                    <v-btn type="submit" class="btn-filter-form" color="primary" block>
                        <v-icon left dark>mdi-magnify</v-icon>
                        Pesquisar
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-card flat>
            <v-card-title class="primary white--text title">
                RELATÓRIO DE HORAS

                <v-spacer></v-spacer>

                <v-btn class="secondary" text @click="onAddTime()">
                    Registrar Agora
                </v-btn>
                <v-btn class="warning ml-2" text dark @click="onCreateClosing()">
                    Criar Fechamento
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-data-table
                :headers="headers"
                :items="reports"
                sort-by="dateFormatted"
                class="elevation-1"
                locale="pt-BR"
                :custom-sort="sortByDate"
                sort-desc
                must-sort
                >
                    <template v-slot:item.closing="{ item }">
                        <v-icon v-if="item.closingId" color="primary" >
                            mdi-lock
                        </v-icon>
                    </template>
                    <template v-slot:item.workedTime="{ item }">
                        <v-chip color="info" class="text-no-wrap" dark>
                            {{ item.workedTime }}
                        </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon small color="primary" class="mr-2" @click="onEditItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon small color="danger" @click="onDeleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/report'
import closingAPI from '@/api/closing'

export default {
    name: 'ReportList',
    data: () => ({
        reports: [],
        filter: {
            dateFrom: '',
            dateTo: ''
        },
        dateFromActivator: false,
        dateToActivator: false
    }),
    computed: {
        ...mapGetters(['activeAccount']),
        headers () {
            if (this.reports.length === 0) return []

            const headers = [{ text: '', value: 'closing', sortable: false }, { text: 'Data', value: 'dateFormatted' }]
            let maxRecordLength = Math.max(...this.reports.map(r => r.records.length))
            maxRecordLength = maxRecordLength % 2 === 0 ? maxRecordLength : maxRecordLength + 1

            for (let i = 0; i < maxRecordLength; i++) {
                if (i % 2 === 0) {
                    headers.push({ text: `Entrada ${i / 2 + 1}`, value: `records[${i}].timeFormatted`, sortable: false })
                } else {
                    headers.push({ text: `Saída ${(i + 1) / 2}`, value: `records[${i}].timeFormatted`, sortable: false })
                }
            }

            headers.push({ text: 'Total', value: 'workedTime', sortable: false })
            headers.push({ text: 'Ações', value: 'actions', sortable: false })

            return headers
        },
        formattedDateFrom () {
            return this.$options.filters.toBRDate(this.filter.dateFrom)
        },
        formattedDateTo () {
            return this.$options.filters.toBRDate(this.filter.dateTo)
        }
    },
    async created () {
        const fromDate = new Date()
        fromDate.setDate(1)
        fromDate.setMonth(fromDate.getMonth() - 1)

        this.filter.dateFrom = this.$options.filters.toISODate(fromDate)
        this.filter.dateTo = this.$options.filters.toISODate(new Date())
        await this.getReports()
    },
    methods: {
        ...mapActions(['setReports', 'updateReports']),
        async getReports () {
            this.setLoading(true)

            await API.list(this.activeAccount.id, this.filter)
                .then(({ data }) => {
                    const reportsResponse = data.data.reports
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.setReports(reportsResponse)
                    }

                    this.reports = [...this.activeAccount.reports]
                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        onAddTime () {
            this.setLoading(true)

            API.addNow(this.activeAccount.id)
                .then(async ({ data }) => {
                    const reportResponse = data.data.report
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.updateReports(reportResponse)
                    }

                    await this.getReports()
                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        onEditItem (item) {
            const id = item.id
            this.$router.push({ name: 'report.edit', params: { id } })
        },
        async onDeleteItem (item) {
            this.setLoading(true)

            await API.delete({ ...item, accountId: this.activeAccount.id })
                .then(async ({ data }) => {
                    const reportsResponse = data.data.reports
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.setReports(reportsResponse)
                    }

                    await this.getReports()
                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        onCreateClosing () {
            this.setLoading(true)

            closingAPI.create({ ...this.filter, accountId: this.activeAccount.id })
                .then(async ({ data }) => {
                    const reportsResponse = data.data.reports
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.setReports(reportsResponse)
                    }

                    await this.getReports()
                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        sortByDate (items, sortBy, sortDesc) {
            const sortDirection = sortDesc[0] ? 1 : -1

            return items.sort((a, b) => {
                const dateA = new Date(a.date)
                const dateB = new Date(b.date)
                return dateA > dateB ? -1 * sortDirection : dateA < dateB ? 1 * sortDirection : 0
            })
        }
    }
}
</script>
