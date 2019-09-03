const nodemailer = require('nodemailer')
const Email = require('email-templates')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

module.exports = (template, locals, to) => {
  const email = new Email({
    message: {
      from: process.env.API_NAME + '<' + process.env.MAIL_USERNAME + '>'
    },
    send: true,
    transport: transporter
  })

  email.send({
    'template': template,
    'message': {
      'to': to
    },
    'locals': locals // Variaveis do template
  }).then((success) => {
    let mail = {
      to: to,
      template: template
    }
    console.log('Success send email => ', mail)
  }).catch((erro) => {
    console.log('erro ao enviar email', erro)
  })
}