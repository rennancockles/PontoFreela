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

    addNow: (accountId) => {
        return $http.post('', {
            query: `
                mutation ($accountId: ID!) {
                    report: addNow (accountId: $accountId) {
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
    },

    delete: ({ accountId, id, date, obs, records }) => {
        records = records.map(rec => ({ id: rec.id, time: rec.time }))
        return $http.post('', {
            query: `
                mutation ($report: ReportInput!) {
                    reports: deleteReport (report: $report) {
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
