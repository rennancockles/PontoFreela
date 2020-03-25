import recordDAO from '../DAL/recordDAO'

export default {
    findById: id => recordDAO.findById(id),

    listByReportId: reportId => recordDAO.listByReportId(reportId),

    insertMany: async (records, reportId) => {
        for (let i = 0; i < records.length; i++) {
            const recordId = await recordDAO.insert(records[i], reportId)
            records[i].id = recordId
        }

        return records
    }
}