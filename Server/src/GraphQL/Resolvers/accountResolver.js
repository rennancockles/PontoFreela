import accountBusiness from '../../Business/accountBusiness';

export const resolver = {
    Mutation: {
        updateAccount: (_, { account }, { userId }) => {
            return accountBusiness.update(account, userId)
        }
    }
}
