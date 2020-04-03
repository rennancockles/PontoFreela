import $http from '@/config/http'

export default {
    updateUser: ({ name, lastname, email, birth, company }) => {
        return $http.post('', {
            query: `
                mutation ($user: UserInput!) {
                    user: updateUser (user: $user) {
                        id
                        name
                        lastname
                        email
                        birth
                        company
                    }
                }
            `,
            variables: {
                user: {
                    name,
                    lastname,
                    email,
                    birth,
                    company
                }
            }
        })
    },

    changePassword: ({ password, currentPassword }) => {
        return $http.post('', {
            query: `
                mutation ($updatePasswordInput: UpdatePasswordInput!) {
                    updatePassword (updatePasswordInput: $updatePasswordInput)
                }
            `,
            variables: {
                updatePasswordInput: {
                    password,
                    currentPassword
                }
            }
        })
    }
}
