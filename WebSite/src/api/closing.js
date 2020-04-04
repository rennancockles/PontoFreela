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
                    }
                }
            `,
            variables: {
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
    }
}
