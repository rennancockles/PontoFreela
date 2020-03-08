import $http from '@/config/http'

export default {
    update: ({ id, active, name, hourlyRate }) => {
        return $http.post('', {
            query: `
                mutation ($account: AccountInput!) {
                    account: updateAccount (account: $account) {
                        id,
                        active,
                        name,
                        hourlyRate
                    }
                }
            `,
            variables: {
                account: {
                    id,
                    active,
                    name,
                    hourlyRate
                }
            }
        })
    },

    delete: ({ id, active, name, hourlyRate }) => {
        return $http.post('', {
            query: `
                mutation ($account: AccountInput!) {
                    accounts: deleteAccount (account: $account) {
                        id,
                        active,
                        name,
                        hourlyRate
                    }
                }
            `,
            variables: {
                account: {
                    id,
                    active,
                    name,
                    hourlyRate
                }
            }
        })
    }
}
