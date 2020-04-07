import xl from 'excel4node'
import moment from 'moment'

let wb
let ws

function writeInfo (reportData) {
    const halfLength = parseInt(reportData.columnsLength / 2)

    ws.cell(1, 1, 2, halfLength, true)
    .string(reportData.company)
    .style({ font: { size: 22, bold: true }, alignment: { horizontal: 'left' } })

    ws.cell(1, halfLength + 1, 1, reportData.columnsLength, true)
    .string(reportData.name)
    .style({ font: { size: 14, bold: true }, alignment: { horizontal: 'right' } })

    ws.cell(2, halfLength + 1, 2, reportData.columnsLength, true)
    .string(`${reportData.fromDate} à ${reportData.toDate}`)
    .style({ font: { size: 11 }, alignment: { horizontal: 'right' } })
}

function writeTableHeader (reportData) {
    const style = wb.createStyle({
        font: { size: 12, bold: true }, 
        alignment: { horizontal: 'center' },
        fill: { type: 'pattern', fgColor: 'D0CECE', patternType: 'solid' },
        border: {
            left: {
                style: 'medium',
                color: '000000'
            },
            right: {
                style: 'medium',
                color: '000000'
            },
            top: {
                style: 'medium',
                color: '000000'
            },
            bottom: {
                style: 'medium',
                color: '000000'
            }
        }
    })
    const row = ws.rowCount + 1

    ws.cell(row, 1).string('Data').style(style)
    for (let i = 0; i < reportData.maxRecordLength; i++) {
        const text = (i % 2 === 0) ? `Entrada ${i / 2 + 1}` : `Saída ${(i + 1) / 2}`
        ws.cell(row, i+2).string(text).style(style)
    }
    ws.cell(row, reportData.columnsLength).string('Total').style(style)
}

function writeTableData (reportData) {
    const style = wb.createStyle({
        font: { size: 11 }, 
        alignment: { horizontal: 'center' },
        fill: { type: 'pattern', fgColor: 'FFFFE1', patternType: 'solid' },
        border: {
            left: {
                style: 'medium',
                color: '000000'
            },
            right: {
                style: 'medium',
                color: '000000'
            },
            top: {
                style: 'medium',
                color: '000000'
            },
            bottom: {
                style: 'medium',
                color: '000000'
            }
        }
    })

    let row = ws.rowCount + 1

    for (let i = 0; i < reportData.reports.length; i++) {
        const report = reportData.reports[i]

        ws.cell(row, 1).string(report.dateFormatted).style(style)
        for (let j = 0; j < reportData.maxRecordLength; j++) {
            const text = report.records[j] ? report.records[j].timeFormatted : ''
            ws.cell(row, 2 + j).string(text).style(style)
        }
        ws.cell(row, reportData.columnsLength).string(report.workedTime).style(style).style({ fill: { fgColor: 'E2EFDA' }})
        row++
        
        if (report.obs) {
            ws.cell(row, 1, row, reportData.columnsLength, true).string(`OBS: ${report.obs}`).style(style)
            .style({ alignment: { horizontal: 'left' }, fill: { fgColor: 'FFFFFF' }})
            row++
        }
    }
}

function writeTableTotals (reportData) {
    const style = wb.createStyle({
        font: { size: 12, bold: true }, 
        alignment: { horizontal: 'left' },
        fill: { type: 'pattern', fgColor: 'DDEBF7', patternType: 'solid' },
        border: {
            left: {
                style: 'medium',
                color: '000000'
            },
            right: {
                style: 'medium',
                color: '000000'
            },
            top: {
                style: 'medium',
                color: '000000'
            },
            bottom: {
                style: 'medium',
                color: '000000'
            }
        }
    })
    const row = ws.rowCount + 1

    ws.cell(row, 1, row, reportData.columnsLength - 1, true).string('Saldo de Horas').style(style)
    ws.cell(row, reportData.columnsLength).string(reportData.totalWorkedTime).style(style)
    .style({ alignment: { horizontal: 'center' }, fill: { fgColor: 'E2EFDA' }})

    ws.cell(row + 1, 1, row + 1, reportData.columnsLength - 1, true).string('Total').style(style)
    ws.cell(row + 1, reportData.columnsLength).string(reportData.totalValue).style(style)
    .style({ alignment: { horizontal: 'center' }, fill: { fgColor: 'E2EFDA' }})
}

function writeSignature (reportData) {
    const style = wb.createStyle({
        font: { size: 10, bold: true }, 
        alignment: { horizontal: 'center' },
        fill: { type: 'pattern', fgColor: 'EDEDED', patternType: 'solid' },
        border: {
            left: {
                style: 'medium',
                color: '000000'
            },
            right: {
                style: 'medium',
                color: '000000'
            },
            top: {
                style: 'medium',
                color: '000000'
            },
            bottom: {
                style: 'medium',
                color: '000000'
            }
        }
    })
    const row = ws.rowCount + 1
    const signature = 'Ponto Freela - pontofreela.r3ck.com.br'

    ws.cell(row, 1, row, reportData.columnsLength, true).string(signature).style(style)
}

export default {
    generateFile: reportData => {
        wb = new xl.Workbook({ author: 'Ponto Freela' })
        ws = wb.addWorksheet('Report')

        writeInfo(reportData)
        writeTableHeader(reportData)
        writeTableData(reportData)
        writeTableTotals(reportData)
        writeSignature(reportData)

        ws.setPrintArea(1, 1, ws.lastUsedRow, ws.lastUsedCol)

        return wb
    }
}
