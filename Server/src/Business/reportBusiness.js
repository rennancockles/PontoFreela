import moment from 'moment'
import reportDAO from '../DAL/reportDAO'
import recordDAO from '../DAL/recordDAO'

export default {
    findById: async (id) => {
        const report = await reportDAO.findById(id)
        
        if (!report) return null

        const records = await recordDAO.listByReportId(report.id)

        return { report, records }
    },

    listByAccountId: async (accountId) => {
        let response = []
        
        const reports = await reportDAO.listByAccountId(accountId)

        for (let i = 0; i < reports.length; i++) {
            const records = await recordDAO.listByReportId(reports[i].id)
            response.push({ report: reports[i], records })
        }        

        return response
    },

    insert: async (reportInput) => {
        const { accountId } = reportInput
        const { records } = reportInput
        const report = { date: reportInput.date, obs: reportInput.obs }
        
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