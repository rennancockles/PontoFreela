import reportBusiness from '../../Business/reportBusiness';

export const resolver = {
    Query: {
        report: (_, { id }, { userId }) => reportBusiness.findById(id),
        reports: (_, { accountId }, { userId }) => reportBusiness.listByAccountId(accountId)
    },
    Mutation: {
        upsertReport: (_, { report }, { userId }) => reportBusiness.upsert(report),
        deleteReport: (_, { report }, { userId }) => reportBusiness.delete(report)
    }
}
