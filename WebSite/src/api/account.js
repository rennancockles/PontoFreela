import $http from '@/config/http'

export default {
    upsert: ({ id, active, name, hourlyRate }) => {
        return $http.post('', {
            query: `
                mutation ($account: AccountInput!) {
                    account: upsertAccount (account: $account) {
                        id
                        active
                        name
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
                        id
                        active
                        name
                        hourlyRate
                        reports {
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
                account: {
                    id,
                    active,
                    name,
                    hourlyRate
                }
            }
        })
    },

    setActive: ({ id }) => {
        return $http.post('', {
            query: `
                mutation ($id: ID!) {
                    account: setActive (id: $id) {
                        id
                        active
                        name
                        hourlyRate
                    }
                }
            `,
            variables: {
                id
            }
        })
    }
}
