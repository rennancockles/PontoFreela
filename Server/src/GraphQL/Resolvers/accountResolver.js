import accountBusiness from '../../Business/accountBusiness';
import reportBusiness from '../../Business/reportBusiness';

export const resolver = {
    Mutation: {
        upsertAccount: (_, { account }, { userId }) => accountBusiness.upsert(account, userId),
        deleteAccount: (_, { account }, { userId }) => accountBusiness.delete(account, userId),
        setActive: (_, { id }, { userId }) => accountBusiness.setActive(id, userId)
    },
    Account: {
        reports: parent => reportBusiness.listByAccountId(parent.id)
    }
}
