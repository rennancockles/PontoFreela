import $http from '@/config/http'

export default {
    updateUser: ({ name, lastname, email, birth }) => {
        return $http.post('', {
            query: `
                mutation ($user: UserInput!) {
                    user: updateUser (user: $user) {
                        id
                        name
                        lastname
                        email
                        birth
                    }
                }
            `,
            variables: {
                user: {
                    name,
                    lastname,
                    email,
                    birth
                }
            }
        })
    }
}
