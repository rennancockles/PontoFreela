import nodemailer from 'nodemailer'

export default {
    send: async (mailTo, subject, body) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWD
            },
            tls: { rejectUnauthorized: true }
        })
    
        const mailData = {
            from: `"Ponto Freela" <${process.env.GMAIL_EMAIL}>`,
            to: mailTo,
            subject: subject,
            html: body
        }
        
        await transporter.sendMail(mailData)
    }
}