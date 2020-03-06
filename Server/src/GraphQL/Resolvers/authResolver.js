import authBusiness from '../../Business/authBusiness';

export const resolver = {
    Query: {
        login: (_, { email, password }) => {
            return authBusiness.login(email, password);
        }
    }
}
