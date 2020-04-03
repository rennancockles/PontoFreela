import authBusiness from '../../Business/authBusiness';

export const resolver = {
    Query: {
        login: (_, { email, password }) => authBusiness.login(email, password),
        recoverEmail: (_, { email }) => authBusiness.sendRecoverEmail(email)
    },
    Mutation: {
        register: (_, { user }) => authBusiness.register(user),
        recover: (_, { recoverInput }) => authBusiness.recoverPassword(recoverInput)
    }
}
