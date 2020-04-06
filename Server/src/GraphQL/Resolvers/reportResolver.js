import reportBusiness from '../../Business/reportBusiness';

export const resolver = {
    Query: {
        report: (_, { id }) => reportBusiness.findById(id),
        reports: (_, { accountId, filter }) => reportBusiness.listByAccountId(accountId, filter),
        downloadReport: async (_, { closingId, accountId }, { userId }) => {
            const excelFile = await reportBusiness.generateReport(closingId, accountId, userId)
            excelFile.write('Report.xlsx')

            return true
        }
    },
    Mutation: {
        addNow: (_, { accountId }) => reportBusiness.addNow(accountId),
        upsertReport: (_, { report }) => reportBusiness.upsert(report),
        deleteReport: (_, { report }) => reportBusiness.delete(report)
    }
}
