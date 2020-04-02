import crypto from 'crypto'

const algorithm = process.env.AES_ALG
const key = process.env.AES_KEY
const iv = process.env.AES_IV

export default {
    encrypt: text => {
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
        let encrypted = cipher.update(text)
        encrypted = Buffer.concat([encrypted, cipher.final()])

        return encrypted.toString('hex')
    },
    
    decrypt: encrypted => {
        const encryptedText = Buffer.from(encrypted, 'hex')
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])

        return decrypted.toString()
    }
}