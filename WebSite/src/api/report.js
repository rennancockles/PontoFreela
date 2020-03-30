import $http from '@/config/http'

export default {
    list: (accountId) => {
        return $http.post('', {
            query: `
                query($accountId: ID) {
                    reports (accountId: $accountId) {
                        id
                        date
                        dateFormatted
                        obs
                        workedMS
                        workedTime
                        records {
                            id
                            time
                            timeFormatted
                        }
                    }
                }
            `,
            variables: {
                accountId
            }
        })
    },

    upsert: ({ accountId, id, date, obs, records }) => {
        return $http.post('', {
            query: `
                mutation ($report: ReportInput!) {
                    report: upsertReport (report: $report) {
                        id
                        date
                        dateFormatted
                        obs
                        workedMS
                        workedTime
                        records {
                            id
                            time
                            timeFormatted
                        }
                    }
                }
            `,
            variables: {
                report: {
                    accountId,
                    id,
                    date,
                    obs,
                    records
                }
            }
        })
    }
}
