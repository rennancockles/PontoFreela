import moment from 'moment'
import recordBusiness from '../Business/recordBusiness'
import reportDAO from '../DAL/reportDAO'
import excel from '../Excel'

function msToStringHour (ms) {
    const hour = Math.floor(ms / 36e5)
    const hourStr = (hour < 10 ? '0' : '') + hour
    const minutes = Math.round(60 * ((ms / 36e5) % 1))
    const minutesStr = (minutes < 10 ? '0' : '') + minutes
    return `${hourStr}:${minutesStr}`
}

function validateRecords(records) {
    records[records.length - 1].time = records[records.length - 1].time === '00:00' ? '24:00' : records[records.length - 1].time

    for (let i = 1; i < records.length; i++) {
        if (moment(records[i-1].time, 'HH:mm') >= moment(records[i].time, 'HH:mm'))
            return false
    }

    return true
}

function getDiffTime(reportDate, initialRecord, finalRecord) {
    const isToday = moment().diff(moment(reportDate), 'days') === 0
    const finalTime = finalRecord ? finalRecord.time : isToday ? moment().format('HH:mm') : '24:00'
    const a = moment(finalTime, 'HH:mm')
    const b = moment(initialRecord.time, 'HH:mm')
    let ms = a.diff(b)

    return ms > 0 ? ms : (ms + 864e5)
}

function setWorkedTime(report) {
    let diff = 0
    const { records } = report

    for (let j = 0; j < records.length; j += 2) {
        diff += getDiffTime(report.date, records[j], records[j + 1])
    }

    report.workedMS = diff
    report.workedTime = msToStringHour(diff)
}

async function insert (reportInput) {
    const { accountId } = reportInput
    const { records } = reportInput
    const report = { date: reportInput.date, obs: reportInput.obs }

    const reportId = await reportDAO.insert(report, accountId)

    if (reportId && reportId > 0) {
        report.id = reportId
        report.records = await recordBusiness.insertMany(records, reportId)
        setWorkedTime(report)

        return report
    }       

    return null
}

async function update (reportInput) {
    const { accountId } = reportInput
    const { records } = reportInput
    const report = { id: reportInput.id, date: reportInput.date, obs: reportInput.obs }

    const success = await reportDAO.update(report, accountId)

    if (success) {
        report.records = await recordBusiness.upsertMany(records, report.id)
        setWorkedTime(report)

        return report
    }       

    return null
}

async function getAddNowReport (accountId, nPreviousDay, newRecord, validateOddRecords) {
    if (nPreviousDay > 1) {
        return { 
            date: moment().format('YYYY-MM-DD'), 
            dateFormatted: moment().format('DD/MM/YYYY'), 
            obs: '', 
            records: [newRecord]
        } 
    }

    let report = await reportDAO.findLastNDayByAccountId(accountId, nPreviousDay)
        
    if (report && report.id > 0) {
        report.records = await recordBusiness.listByReportId(report.id)

        if (validateOddRecords && report.records.length % 2 === 0) {
            return await getAddNowReport(accountId, nPreviousDay + 1, newRecord, !validateOddRecords)
        }

        newRecord.reportId = report.id
        report.records.push(newRecord)

        return report
    } else {
        return await getAddNowReport(accountId, nPreviousDay + 1, newRecord, !validateOddRecords)
    }
}

export default {
    findById: async id => {
        const report = await reportDAO.findById(id)
        report.records = await recordBusiness.listByReportId(report.id)

        setWorkedTime(report)

        return report
    },

    listByAccountId: async (accountId, filter) => {
        const reports = await reportDAO.listByAccountId(accountId, filter)

        for (let i = 0; i < reports.length; i++) {
            const report = reports[i]
            report.records = await recordBusiness.listByReportId(report.id)

            setWorkedTime(report)
        }

        return reports
    },

    addNow: async accountId => {
        const newRecord = { time: moment().format('HH:mm:ss'), timeFormatted: moment().format('HH:mm') }
        const report = await getAddNowReport(accountId, 0, newRecord, false)

        return exports.default.upsert({ accountId, ...report })
    },

    upsert: reportInput => {
        if (!reportInput.id || reportInput.id == 0) {
            return insert(reportInput)
        } else {
            return update(reportInput)
        }
    },

    delete: async reportInput => {
        const { accountId } = reportInput
        const { records } = reportInput
        const report = { id: reportInput.id, date: reportInput.date, obs: reportInput.obs }

        await recordBusiness.deleteMany(records, report.id)
        const success = await reportDAO.delete(report, accountId)
        
        if (success) return exports.default.listByAccountId(accountId)
        else return null
    },

    generateReport: async (closingId, accountId, userId) => {
        const reportData = await reportDAO.getReportData(closingId, accountId, userId)
        reportData.reports = await reportDAO.listByClosingId(accountId, closingId)
        
        for (let i = 0; i< reportData.reports.length; i++) {
            const report = reportData.reports[i]
            report.records = await recordBusiness.listByReportId(report.id)
            setWorkedTime(report)
        }
        
        const maxRecordLength = Math.max(...reportData.reports.map(r => r.records.length))
        reportData.maxRecordLength = maxRecordLength % 2 === 0 ? maxRecordLength : maxRecordLength + 1
        reportData.columnsLength = reportData.maxRecordLength + 2      
        
        const totalWorkedTime = reportData.reports.map(rep => rep.workedMS).reduce((acc, cur) => acc + cur, 0)
        reportData.totalValue = (reportData.hourlyRate * totalWorkedTime / (1000 * 60 * 60)).toFixed(2)
        reportData.totalWorkedTime = msToStringHour(totalWorkedTime)
        
        const excelFile = excel.generateFile(reportData)
        const buffer = await excelFile.writeToBuffer()
        return buffer.toString('base64')
    }
}