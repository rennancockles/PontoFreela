import accountBusiness from '../../Business/accountBusiness';

export const resolver = {
    Mutation: {
        upsertAccount: (_, { account }, { userId }) => {
            return accountBusiness.upsert(account, userId)
        },
        deleteAccount: (_, { account }, { userId }) => {
            return accountBusiness.delete(account, userId)
        }
    }
}
