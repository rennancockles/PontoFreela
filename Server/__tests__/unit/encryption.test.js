import 'dotenv/config'
import createEncryption from '../../src/Encryption'

describe("Encryption", () => {
    describe("When created", () => {
        it('should not throw errors', () => {
            expect(() => { createEncryption() }).not.toThrow()
        })

        it('should have encrypt and decrypt methods', () => {
            const encryption = createEncryption()
            expect(encryption).toHaveProperty('encrypt')
            expect(encryption).toHaveProperty('decrypt')
        })
    })
    
    describe("When executed", () => {
        it('should have encrypt input as decrypt output', () => {
            const encryption = createEncryption()

            const obj = {
                action: 'test',
                validHours: 1
            }
        
            const encrypted = encryption.encrypt(JSON.stringify(obj))        
            expect(encryption.decrypt(encrypted)).toBe(JSON.stringify(obj))
        })
        
        it('should output an empty string when called with empty string as input', () => {
            const encryption = createEncryption()

            expect(encryption.encrypt('')).toBe('')
            expect(encryption.decrypt('')).toBe('')
        })
        
        test('should output an empty string when called with null input', () => {
            const encryption = createEncryption()

            expect(encryption.encrypt(null)).toBe('')
            expect(encryption.decrypt(null)).toBe('')
        })
        
        test('should output an empty string when called with undefined input', () => {
            const encryption = createEncryption()

            expect(encryption.encrypt(undefined)).toBe('')
            expect(encryption.decrypt(undefined)).toBe('')
        })
    })
})