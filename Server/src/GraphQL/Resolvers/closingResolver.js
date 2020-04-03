import closingBusiness from '../../Business/closingBusiness';

export const resolver = {
    Mutation: {
        createClosing: (_, { closingInput }) => closingBusiness.create(closingInput)
    }
}
