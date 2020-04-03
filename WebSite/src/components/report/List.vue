<template>
    <v-card flat>
        <v-card-title class="primary white--text title">
            RELATÓRIO DE HORAS

            <v-spacer></v-spacer>

            <v-btn class="secondary" text @click="onAddTime()">
                Registrar Agora
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/report'

export default {
    name: 'ReportList',
    data: () => ({
        reports: []
    }),
    computed: {
        ...mapGetters(['activeAccount']),
        headers () {
            if (this.reports.length === 0) return []

            const headers = [{ text: 'Data', value: 'dateFormatted' }]
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
            headers.push({ text: 'Actions', value: 'actions', sortable: false })

            return headers
        }
    },
    async created () {
        await this.getReports()
    },
    methods: {
        ...mapActions(['setReports', 'updateReports']),
        async getReports () {
            this.setLoading(true)

            await API.list(this.activeAccount.id)
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
