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
        let dbRecords = await exports.default.listByReportId(reportId)

        for (let i = 0; i < records.length; i++) {

            if (!records[i].id || records[i].id == 0) {
                const recordId = await recordDAO.insert(records[i], reportId)
                records[i].id = recordId
            } else {
                dbRecords = dbRecords.filter(rec => rec.id != records[i].id)
                await recordDAO.update(records[i], reportId)
            }
        }

        await exports.default.deleteMany(dbRecords, reportId)

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