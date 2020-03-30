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

function getDiffTime(reportDate, initialRecord, finalRecord) {
    const isToday = moment().diff(moment(reportDate), 'days') === 0
    const finalTime = finalRecord ? finalRecord.time : isToday ? moment().format('HH:mm:ss') : '24:00:00'
    const a = moment(finalTime, 'HH:mm:ss')
    const b = moment(initialRecord.time, 'HH:mm:ss')
    return a.diff(b)
}

function setWorkedTime(report) {
    let diff = 0
    const { records } = report

    for (let j = 0; j < records.length; j += 2) {
        diff += getDiffTime(report.date, records[j], records[j + 1])
    }

    report.workedMS = diff
    report.workedTime = moment.utc(diff).format('HH:mm')
}

export default {
    findById: async id => {
        const report = await reportDAO.findById(id)
        report.records = await recordBusiness.listByReportId(report.id)

        setWorkedTime(report)

        return report
    },

    listByAccountId: async accountId => {
        const reports = await reportDAO.listByAccountId(accountId)

        for (let i = 0; i < reports.length; i++) {
            const report = reports[i]
            report.records = await recordBusiness.listByReportId(report.id)

            setWorkedTime(report)
        }

        return reports
    },

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