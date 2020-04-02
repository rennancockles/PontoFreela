import fs from 'fs'
import path from 'path'
import mailer from './'

export default {
    send: (mailTo, fullName, url) => {
        fs.readFile(path.resolve(__dirname, 'Templates', 'recover.html'), 'utf8', (err, data) => {
            if (err) throw err
            
            const body = data.replace(/@Name/g, fullName).replace(/@Url/g, url)
            const subject = 'Solicitação de alteração da senha de acesso'

            mailer.send(mailTo, subject, body).catch(err => console.log(err))
        })
    }
}