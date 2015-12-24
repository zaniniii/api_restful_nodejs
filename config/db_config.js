
var db_string = "mongodb://127.0.0.1:27017/modelo_restfull";

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco.'));


