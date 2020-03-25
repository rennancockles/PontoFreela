<template>
    <p>
        VUEX REPORTS
        <br>
        {{ activeAccount.reports }}
        <br>
        <br>
        REPORTS
        <br>
        {{ reports }}
    </p>
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
        ...mapGetters(['activeAccount'])
    },
    async created () {
        await this.getReports()
        this.reports = [...this.activeAccount.reports]
    },
    methods: {
        ...mapActions(['setReports']),
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

                    this.setLoading(false)
                })
                .catch(this.$throwException)
        }
    }
}
</script>
