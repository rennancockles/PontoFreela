import createEncryption from '../../src/Encryption'

const encryptionConfig = {
    algorithm: 'aes-256-cbc',
    key: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
    iv: '0123456789abcdef0123456789abcdef'
}

describe("Encryption", () => {
    describe("When created", () => {
        it('should not throw errors', () => {
            expect(() => { createEncryption(encryptionConfig) }).not.toThrow()
        })

        it('should have encrypt and decrypt methods', () => {
            const encryption = createEncryption(encryptionConfig)
            expect(encryption).toHaveProperty('encrypt')
            expect(encryption).toHaveProperty('decrypt')
        })
    })
    
    describe("When executed", () => {
        it('should have encrypt input as decrypt output', () => {
            const encryption = createEncryption(encryptionConfig)

            const obj = {
                action: 'test',
                validHours: 1
            }
        
            const encrypted = encryption.encrypt(JSON.stringify(obj))
        
            expect(encrypted).toBe('9f9f6ccdd244d6fef51d2ad77c2658a4087a6b983e7585dbc7bb380ead542a27fecda6c2edaef53af49118868459777d')
            expect(encryption.decrypt(encrypted)).toBe(JSON.stringify(obj))
        })
        
        it('should output an empty string when called with empty string as input', () => {
            const encryption = createEncryption(encryptionConfig)

            expect(encryption.encrypt('')).toBe('')
            expect(encryption.decrypt('')).toBe('')
        })
        
        test('should output an empty string when called with null input', () => {
            const encryption = createEncryption(encryptionConfig)

            expect(encryption.encrypt(null)).toBe('')
            expect(encryption.decrypt(null)).toBe('')
        })
        
        test('should output an empty string when called with undefined input', () => {
            const encryption = createEncryption(encryptionConfig)

            expect(encryption.encrypt(undefined)).toBe('')
            expect(encryption.decrypt(undefined)).toBe('')
        })
    })
})