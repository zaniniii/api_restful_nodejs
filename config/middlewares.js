var morgan = require('morgan'),
    FileStreamRotator = require('file-stream-rotator'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    helmet = require('helmet'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    cors = require('../config/cors');

module.exports = function(app){

  //Blindando API com HELMET
  app.use(helmet());

  //Utilizando GZIP
  app.use(compression());

  //Formata Exibição da Dados no browser em JSON
  app.set("json spaces", 4);

  app.use(cors);

  //Acionando o Json com BodyParse
  app.use(bodyParser.json());
  app.use(bodyParser.json({limit: "12mb"}));
  app.use(bodyParser.urlencoded({ limit: "12mb", extended: true }));


  //Criando logs das requisições
  var logDirectory = path.join(__dirname, '../logs');

  //Verifica se existe
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  // create a rotating write stream
  var accessLogStream = FileStreamRotator.getStream({
    date_format: 'DD_MM_YYYY',
    filename: path.join(logDirectory, 'log-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })

  // setup the logger
  app.use(morgan('short', {stream: accessLogStream}));

}
