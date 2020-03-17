import reportBusiness from '../../Business/reportBusiness';

export const resolver = {
    Query: {
        report: (_, { id }, { userId }) => {
            return reportBusiness.findById(id)
        },
        reports: (_, { accountId }, { userId }) => {
            return reportBusiness.listByAccountId(accountId)
        }
    },
    Mutation: {
        insertReport: (_, { report }, { userId }) => {
            return reportBusiness.insert(report)
        }
    }
}
