import $http from '@/config/http'

export default {
    list: (accountId) => {
        return $http.post('', {
            query: `
                query($accountId: ID!) {
                    reports: reports (accountId: $accountId) {
                        report {
                          id
                          date
                          obs
                          records {
                            id
                            time
                          }
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
                        obs
                        records {
                            id
                            time
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
