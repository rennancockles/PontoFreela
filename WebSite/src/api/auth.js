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

    recover: (email) => {
        return $http.post('', {
            query: `
                query ($email: String!) {
                    recover (email: $email)
                }
            `,
            variables: {
                email
            }
        })
    }
}
