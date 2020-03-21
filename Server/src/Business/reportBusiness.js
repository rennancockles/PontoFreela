import moment from 'moment'
import reportDAO from '../DAL/reportDAO'
import recordDAO from '../DAL/recordDAO'

function validateRecords(records) {
    for (let i = 1; i < records.length; i++) {
        if (moment(records[i-1].time, 'HH:mm') >= moment(records[i].time, 'HH:mm'))
            return false
    }

    return true
}

export default {
    findById: async id => reportDAO.findById(id),

    listByAccountId: accountId => reportDAO.listByAccountId(accountId),

    insert: async (reportInput) => {
        const { accountId } = reportInput
        const { records } = reportInput
        const report = { date: reportInput.date, obs: reportInput.obs }

        if (!validateRecords(records)) throw new Error("Horas inválidas!")
        
        const reportId = await reportDAO.insert(report, accountId)

        if (reportId && reportId > 0) {
            report.id = reportId

            for (let i = 0; i < records.length; i++) {
                const recordId = await recordDAO.insert(records[i], reportId)
                records[i].id = recordId
            }

            return { report, records }
        }       

        return null
    }
}