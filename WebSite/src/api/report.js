import $http from '@/config/http'

export default {
    list: (accountId, filter) => {
        return $http.post('', {
            query: `
                query($accountId: ID, $filter: ReportFilter) {
                    reports (accountId: $accountId, filter: $filter) {
                        id
                        date
                        dateFormatted
                        obs
                        workedMS
                        workedTime
                        closingId
                        records {
                            id
                            time
                            timeFormatted
                        }
                    }
                }
            `,
            variables: {
                accountId,
                filter
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
                        closingId
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
                        closingId
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
                        closingId
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
