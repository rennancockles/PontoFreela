import userBusiness from '../../Business/userBusiness';
import accountBusiness from '../../Business/accountBusiness';

export const resolver = {
    Query: {
        user: (_, args, { userId }) => userBusiness.findById(userId)
    },
    Mutation: {
        updateUser: (_, { user }, { userId }) => userBusiness.update(user, userId)
    },
    User: {
        accounts: async (parent, { onlyActive }) => {
            const accounts = await accountBusiness.listByUserId(parent.id)
            return onlyActive ? accounts.filter(acc => acc.active) : accounts
        }
    }
}
