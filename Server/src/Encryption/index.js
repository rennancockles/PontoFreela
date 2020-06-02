import crypto from 'crypto'

function createEncryption (config = {}) {
    const algorithm = config.algorithm || process.env.AES_ALG
    const key = config.key || process.env.AES_KEY
    const iv = config.iv || process.env.AES_IV
    
    function encrypt (text) {
        if (!text) return ''

        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
        let encrypted = cipher.update(text)
        encrypted = Buffer.concat([encrypted, cipher.final()])

        return encrypted.toString('hex')
    }
    
    function decrypt (encrypted) {
        if (!encrypted) return ''

        const encryptedText = Buffer.from(encrypted, 'hex')
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])

        return decrypted.toString()
    }

    return {
        encrypt,
        decrypt,
    }
}

export default createEncryption