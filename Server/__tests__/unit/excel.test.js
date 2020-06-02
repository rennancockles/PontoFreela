import excel from '../../src/Excel'

const reportMock = {
    columnsLength: 4,
    company: 'Mock Test',
    fromDate: '01/01/2020',
    hourlyRate: 5,
    maxRecordLength: 2,
    name: 'AgVen',
    reports: [
		{
			dateFormatted: '20/01/2020',
			obs: '',
			records: [
				{
					timeFormatted:'18:00',
				},
				{
					timeFormatted:'19:30',
				}
			],
			workedMS: 5400000,
			workedTime: '01:30',
		},
		{
			dateFormatted: '30/01/2020',
			obs: 'Test',
			records: [
				{
					timeFormatted:'18:00',
				}
			],
			workedMS: 3600000,
			workedTime: '01:00',
		}
	],
    toDate:'01/02/2020',
    totalValue:'12.50',
    totalWorkedTime:'02:30',
}

describe('Excel', () => {
    describe('When executed', () => {
        it('should not throw errors', () => {
            expect(() => { excel.generateFile(reportMock) }).not.toThrow()
        })
    })

    describe('Workbook', () => {
        it('should have author "Ponto Freela"', () => {
            const workbook = excel.generateFile(reportMock)

            expect(workbook).toHaveProperty('author')
            expect(workbook.author).toBe('Ponto Freela')
        })

        it('should have 1 sheet', () => {
            const workbook = excel.generateFile(reportMock)

            expect(workbook).toHaveProperty('sheets')
            expect(workbook.sheets.length).toBe(1)
        })
    })

    describe('Sheet', () => {
        it('should be named "Report"', () => {
            const workbook = excel.generateFile(reportMock)
            const sheet = workbook.sheets[0]

            expect(sheet.name).toBe('Report')
        })

        it('should have 9 rows', () => {
            const workbook = excel.generateFile(reportMock)
            const sheet = workbook.sheets[0]

            expect(sheet.rowCount).toBe(9)
        })

        it('should have correct mergedCells', () => {
            const workbook = excel.generateFile(reportMock)
            const sheet = workbook.sheets[0]

            expect(sheet.mergedCells).toEqual(['A1:B2', 'C1:D1', 'C2:D2', 'A6:D6', 'A7:C7', 'A8:C8', 'A9:D9'])
        })
    })
})