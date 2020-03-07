import authRequired from './auth'

export default {
    Query: {
        user: authRequired
    },
    Mutation: {
        updateUser: authRequired
    }
}
