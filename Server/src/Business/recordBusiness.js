import recordDAO from '../DAL/recordDAO'

export default {
    findById: id => recordDAO.findById(id),

    listByReportId: reportId => recordDAO.listByReportId(reportId)
}