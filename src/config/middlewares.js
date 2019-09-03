const Morgan = require('morgan')
const i18n = require('i18n')
const FileStreamRotator = require('file-stream-rotator')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('../config/cors')

module.exports = (app) => {
  // Blindando API com HELMET
  app.use(helmet.hidePoweredBy())

  // Utilizando GZIP
  app.use(compression())

  // Formata Exibição da Dados no browser em JSON
  app.set('json spaces', 4)

  // Permissções cors
  app.use(cors)

  // Acionando o Json com BodyParse
  app.use(bodyParser.json({
    type: ['json', 'application/csp-report']
  }))

  app.use(bodyParser.json({
    limit: process.env.LIMIT_PARSE
  }))

  app.use(bodyParser.urlencoded({
    limit: process.env.LIMIT_PARSE,
    extended: true
  }))

  // Criando logs das requisições
  var logDirectory = path.join(__dirname, '../logs')

  // Verifica se existe
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

  //  create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'DD_MM_YYYY',
    filename: path.join(logDirectory, 'log-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })

  //  Instala o log
  app.use(Morgan('short', {
    stream: accessLogStream
  }))

  // Configure idiomas
  i18n.configure({
    locales: ['pt'],
    directory: path.join(__dirname, '../locales'),
    directoryPermissions: '755',
    autoReload: true,
    updateFiles: true,
    syncFiles: true,
    prefix: 'api-',
    cookie: 'api',
    register: global,
    defaultLocale: process.env.LANGUAGE_DEFAULT
  })

  app.use(i18n.init)
}