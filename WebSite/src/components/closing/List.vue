<template>
    <v-card flat>
        <v-card-title class="primary white--text title">
            FECHAMENTOS
        </v-card-title>

        <v-card-text>
            <v-data-table
            :headers="headers"
            :items="closings"
            sort-by="fromDateFormatted"
            class="elevation-1"
            locale="pt-BR"
            :custom-sort="sortByDate"
            sort-desc
            must-sort
            >
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
            { text: 'Data Inicial', value: 'fromDateFormatted' },
            { text: 'Data Final', value: 'toDateFormatted', sortable: false },
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
                        console.log(closingsResponse)
                    }

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        },
        sortByDate (items, sortBy, sortDesc) {
            const sortDirection = sortDesc[0] ? 1 : -1

            return items.sort((a, b) => {
                const dateA = new Date(a.fromDate)
                const dateB = new Date(b.fromDate)
                return dateA > dateB ? -1 * sortDirection : dateA < dateB ? 1 * sortDirection : 0
            })
        }
    }
}
</script>
