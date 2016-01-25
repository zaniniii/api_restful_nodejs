
//var db_string = "mongodb://localhost:27017/modelo_restfull";
var db_string = "mongodb://zanini:lczm798585@ds049935.mongolab.com:49935/apinodejs";


var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco.'));


