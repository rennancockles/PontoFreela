import userBusiness from '../../Business/userBusiness';

export const resolver = {
    Query: {
        user: (_, { id }, { userId }) => {
            return userBusiness.findById(id)
        }
    },
    Mutation: {
        createUser: () => {}
    }
}
