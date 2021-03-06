import $http from '@/config/http'

export default {
    login: ({ email, password }) => {
        return $http.post('', {
            query: `
                query($email: String!, $password: String!) {
                    login (email: $email, password: $password) {
                        token
                        user {
                            id
                            name
                            lastname
                            email
                            birth
                            company
                            accounts {
                                id
                                name
                                hourlyRate
                                active
                                reports {
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
                        }
                    }
                }
            `,
            variables: {
                email,
                password
            }
        })
    },

    register: ({ name, lastname, email, birth, company, password }) => {
        return $http.post('', {
            query: `
                mutation ($user: AuthInput!) {
                    login: register (user: $user) {
                        token
                        user {
                            id
                            name
                            lastname
                            email
                            birth
                            company
                            accounts {
                                id
                                name
                                hourlyRate
                                active
                                reports {
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
                        }
                    }
                }
            `,
            variables: {
                user: {
                    name,
                    lastname,
                    email,
                    password,
                    birth,
                    company
                }
            }
        })
    },

    recoverEmail: (email) => {
        return $http.post('', {
            query: `
                query ($email: String!) {
                    recoverEmail (email: $email)
                }
            `,
            variables: {
                email
            }
        })
    },

    recover: ({ email, password, token }) => {
        return $http.post('', {
            query: `
                mutation ($recoverInput: RecoverInput!) {
                    recover (recoverInput: $recoverInput)
                }
            `,
            variables: {
                recoverInput: {
                    token,
                    email,
                    password
                }
            }
        })
    }
}
