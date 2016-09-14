var helmet = require('helmet'),
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

}
