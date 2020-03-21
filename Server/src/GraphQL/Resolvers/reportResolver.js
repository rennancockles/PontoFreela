import reportBusiness from '../../Business/reportBusiness';
import recordBusiness from '../../Business/recordBusiness';

export const resolver = {
    Query: {
        report: (_, { id }, { userId }) => reportBusiness.findById(id),
        reports: (_, { accountId }, { userId }) => reportBusiness.listByAccountId(accountId)
    },
    Mutation: {
        insertReport: (_, { report }, { userId }) => reportBusiness.insert(report)
    },
    Report: {
        records: parent => recordBusiness.listByReportId(parent.id)
    }
}
