import closingBusiness from '../../Business/closingBusiness';

export const resolver = {
    Query: {
        closings: (_, { accountId }, { userId }) => closingBusiness.list(accountId, userId)
    },
    Mutation: {
        createClosing: (_, { closingInput }) => closingBusiness.create(closingInput),
        deleteClosing: (_, { closingId, accountId }, { userId }) => closingBusiness.delete(closingId, accountId, userId),
        changePaidStatus: (_, { closingId, accountId, paidStatus }, { userId }) => 
            closingBusiness.changePaidStatus(closingId, accountId, userId, paidStatus)
    }
}
