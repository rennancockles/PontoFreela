import $http from '@/config/http'

export default {
    list: (accountId) => {
        return $http.post('', {
            query: `
                query ($accountId: ID!) {
                    closings (accountId: $accountId) {
                        id
                        fromDate
                        fromDateFormatted
                        toDate
                        toDateFormatted
                        createdAt
                        createdAtFormatted
                        totalMs
                        totalTime
                        totalValue
                        isPaid
                    }
                }
            `,
            variables: {
                accountId
            }
        })
    },

    delete: (closingId, accountId) => {
        return $http.post('', {
            query: `
                mutation ($closingId: ID!, $accountId: ID!) {
                    closings: deleteClosing (closingId: $closingId, accountId: $accountId) {
                        id
                        fromDate
                        fromDateFormatted
                        toDate
                        toDateFormatted
                        createdAt
                        createdAtFormatted
                        totalMs
                        totalTime
                        totalValue
                        isPaid
                    }
                }
            `,
            variables: {
                closingId,
                accountId
            }
        })
    },

    create: ({ dateFrom, dateTo, accountId }) => {
        return $http.post('', {
            query: `
                mutation ($closingInput: ClosingInput!) {
                    reports: createClosing (closingInput: $closingInput) {
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
                closingInput: {
                    dateFrom,
                    dateTo,
                    accountId
                }
            }
        })
    },

    downloadReport: (closingId, accountId) => {
        return $http.post('', {
            query: `
                query ($closingId: ID!, $accountId: ID!) {
                    report: downloadReport (closingId: $closingId, accountId: $accountId)
                }
            `,
            variables: {
                closingId,
                accountId
            }
        })
    }
}
