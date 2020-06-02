import { msToStringHour } from '../../src/Helpers/dateTimeHelper'

describe('DateTime Helper', () => {
    describe('msToStringHour', () => {
        it('should return "00:00" when passed 0', () => {
            expect(msToStringHour(0)).toBe('00:00')
        })
        
        it('should return "00:00" when passed 1000', () => {
            expect(msToStringHour(1000)).toBe('00:00')
        })
        
        it('should return "00:00" when passed 29000', () => {
            expect(msToStringHour(29000)).toBe('00:00')
        })
        
        it('should return "00:01" when passed 30000', () => {
            expect(msToStringHour(30000)).toBe('00:01')
        })
        
        it('should return "00:01" when passed 60000', () => {
            expect(msToStringHour(60000)).toBe('00:01')
        })
        
        it('should return "00:30" when passed 1800000', () => {
            expect(msToStringHour(1800000)).toBe('00:30')
        })
        
        it('should return "01:00" when passed 3600000', () => {
            expect(msToStringHour(3600000)).toBe('01:00')
        })
        
        it('should return "01:10" when passed 4200000', () => {
            expect(msToStringHour(4200000)).toBe('01:10')
        })
        
        it('should return "20:00" when passed 72000000', () => {
            expect(msToStringHour(72000000)).toBe('20:00')
        })
    })
})