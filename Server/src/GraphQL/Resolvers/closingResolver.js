import closingBusiness from '../../Business/closingBusiness';

export const resolver = {
    Query: {
        closings: (_, { accountId }, { userId }) => closingBusiness.list(accountId, userId)
    },
    Mutation: {
        createClosing: (_, { closingInput }) => closingBusiness.create(closingInput)
    }
}
