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
    },

    updateMany: async (records, reportId) => {
        for (let i = 0; i < records.length; i++) {
            await recordDAO.update(records[i], reportId)
        }

        return records
    },

    upsertMany: async (records, reportId) => {
        for (let i = 0; i < records.length; i++) {

            if (!records[i].id || records[i].id == 0) {
                const recordId = await recordDAO.insert(records[i], reportId)
                records[i].id = recordId
            } else {
                await recordDAO.update(records[i], reportId)
            }
        }

        return records
    },

    deleteMany: async (records, reportId) => {
        for (let i = 0; i < records.length; i++) {

            if (records[i].id && records[i].id > 0) {
                await recordDAO.delete(records[i], reportId)
            }
        }
    }
}