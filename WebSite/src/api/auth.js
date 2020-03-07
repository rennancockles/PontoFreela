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
                        }
                        accounts {
                            id
                            name
                            hourlyRate
                            active
                        }
                    }
                }
            `,
            variables: {
                email,
                password
            }
        })
    }
}
