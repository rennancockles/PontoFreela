import moment from 'moment'
import recordBusiness from '../Business/recordBusiness'
import reportDAO from '../DAL/reportDAO'

function validateRecords(records) {
    for (let i = 1; i < records.length; i++) {
        if (moment(records[i-1].time, 'HH:mm') >= moment(records[i].time, 'HH:mm'))
            return false
    }

    return true
}

export default {
    findById: id => reportDAO.findById(id),

    listByAccountId: accountId => reportDAO.listByAccountId(accountId),

    upsert: reportInput => {
        const horasValidas = validateRecords(reportInput.records)
        if (!horasValidas) throw new Error("Horas inválidas!")

        if (!reportInput.id || reportInput.id == 0) {
            return exports.default.insert(reportInput)
        } else {
            console.log('UPDATE')
        }
    },

    insert: async (reportInput) => {
        const { accountId } = reportInput
        const { records } = reportInput
        const report = { date: reportInput.date, obs: reportInput.obs }

        const reportId = await reportDAO.insert(report, accountId)

        if (reportId && reportId > 0) {
            report.id = reportId
            report.records = await recordBusiness.insertMany(records, reportId)

            return report
        }       

        return null
    }
}