import authBusiness from '../../Business/authBusiness';

export const resolver = {
    Query: {
        login: (_, { email, password }) => authBusiness.login(email, password),
        recover: (_, { email }) => authBusiness.recover(email)
    },
    Mutation: {
        register: (_, { user }) => authBusiness.register(user)
    }
}
