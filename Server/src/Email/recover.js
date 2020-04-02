import fs from 'fs'
import path from 'path'
import mailer from './'

export default {
    send: (user) => {
        const name = `${user.name.charAt(0).toUpperCase()}${user.name.toLowerCase().slice(1)}`
        const lastname = `${user.lastname.charAt(0).toUpperCase()}${user.lastname.toLowerCase().slice(1)}`
        const fullName = `${name} ${lastname}`
        const url = 'http://localhost:8080/'

        fs.readFile(path.resolve(__dirname, 'Templates', 'recover.html'), 'utf8', (err, data) => {
          if (err) throw err
          
          const body = data.replace(/@Name/g, fullName).replace(/@Url/g, url)
          const subject = 'Solicitação de alteração da senha de acesso'
          const mailTo = user.email

          mailer.send(mailTo, subject, body).catch(err => console.log(err))
        })
    }
}