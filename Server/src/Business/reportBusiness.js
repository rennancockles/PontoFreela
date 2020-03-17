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
    }
}