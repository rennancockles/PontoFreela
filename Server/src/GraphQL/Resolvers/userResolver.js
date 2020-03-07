import userBusiness from '../../Business/userBusiness';

export const resolver = {
    Query: {
        users: () => {
            return userBusiness.list()
        },
        user: (_, { id }, { userId }) => {
            return userBusiness.findById(id)
        }
    },
    Mutation: {
        createUser: () => {}
    }
}
