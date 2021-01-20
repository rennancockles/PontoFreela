<template>
    <v-card id="closings" flat>
        <v-card-title class="primary white--text title">
            FECHAMENTOS
        </v-card-title>

        <v-card-text>
            <v-data-table
            :headers="headers"
            :items="closings"
            sort-by="createdAtFormatted"
            class="elevation-1"
            locale="pt-BR"
            :custom-sort="sortByDate"
            sort-desc
            must-sort
            >
                <template v-slot:item.totalValue="{ item }">
                    {{ item.totalValue | currency }}
                </template>
                <template v-slot:item.isPaid="{ item }">
                    <v-checkbox
                    v-model="item.isPaid"
                    :label="item.paymentDateFormatted"
                    @click.stop="checkboxChange(item)"
                    ></v-checkbox>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small color="danger" @click="onDeleteClosing(item)">
                        mdi-delete
                    </v-icon>
                    <v-icon small color="primary" class="ml-1" @click="onDownloadReport(item)">
                        mdi-download
                    </v-icon>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api/closing'

export default {
    name: 'ClosingList',
    data: () => ({
        closings: [],
        headers: [
            { text: 'Data de Criação', value: 'createdAtFormatted' },
            { text: 'Data Inicial', value: 'fromDateFormatted' },
            { text: 'Data Final', value: 'toDateFormatted', sortable: false },
            { text: 'Horas Trabalhadas', value: 'totalTime', sortable: false },
            { text: 'Valor', value: 'totalValue', sortable: false },
            { text: 'Pago', value: 'isPaid', sortable: false },
            { text: 'Ações', value: 'actions', sortable: false }
        ]
    }),
    computed: {
        ...mapGetters(['activeAccount'])
    },
    async created () {
        await this.getClosings()
    },
    methods: {
        ...mapActions(['setReports', 'updateReports']),
        async getClosings () {
            this.setLoading(true)

            await API.list(this.activeAccount.id)
                .then(({ data }) => {
                    const closingsResponse = data.data.closings
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.closings = closingsResponse
                    }

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        async onDeleteClosing (item) {
            this.setLoading(true)

            await API.delete(item.id, this.activeAccount.id)
                .then(async ({ data }) => {
                    const closingsResponse = data.data.closings
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.closings = closingsResponse
                    }

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        onDownloadReport (item) {
            this.setLoading(true)

            API.downloadReport(item.id, this.activeAccount.id)
                .then(async ({ data }) => {
                    const errors = data.errors
                    const base64 = data.data.report

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.downloadFile(base64)
                    }

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        sortByDate (items, sortBy, sortDesc) {
            const sortDirection = sortDesc[0] ? 1 : -1
            const sortColumn = sortBy[0].replace('Formatted', '')

            return items.sort((a, b) => {
                const dateA = new Date(a[sortColumn])
                const dateB = new Date(b[sortColumn])
                return dateA > dateB ? -1 * sortDirection : dateA < dateB ? 1 * sortDirection : 0
            })
        },
        downloadFile (base64) {
            const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            const linkSource = `data:${contentType};base64,${base64}`
            const fileName = 'Report.xlsx'
            const anchor = document.createElement('a')

            anchor.href = linkSource
            anchor.download = fileName
            anchor.click()
        },
        async checkboxChange (item) {
            this.setLoading(true)

            await API.changePaidStatus(item.id, this.activeAccount.id, item.isPaid)
                .then(async ({ data }) => {
                    const closingsResponse = data.data.closings
                    const errors = data.errors

                    if (errors && errors.length > 0) {
                        this.$throwException(errors[0])
                    } else {
                        this.closings = closingsResponse
                    }

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        }
    }
}
</script>

<style lang="scss">
#closings label.v-label {
    font-size: .875rem !important;
    color: rgba(0,0,0,.87) !important;
}
</style>
