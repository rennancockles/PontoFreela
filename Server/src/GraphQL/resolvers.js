import userDAO from '../DAL/userDAO'
import accountDAO from '../DAL/accountDAO'

export default {
    Query: {
        users: async () => {
            const users = await userDAO.list()
            
            for (let i = 0; i < users.length; i++)
            {
                users[i].accounts = await accountDAO.listByUserId(users[i].id)
            }
            
            return users
        },
        user: async (_, { id }) => {
            const user = await userDAO.findById(id)
            user.accounts = await accountDAO.listByUserId(id)

            return user
        },
        accounts: (_, { userId }) => accountDAO.listByUserId(userId)
    },
    Mutation: {
        createUser: () => {}
    }
}
