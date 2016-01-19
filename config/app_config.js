
var express = require('express');
var morgan = require('morgan'); //logs
var fs = require('fs');  // file system

var app = module.exports = express();

var bodyParser = require('body-parser');

var allowCors = function(req, res, next){
	// res.header("Access-Control-Allow-Origin", "127.0.0.1:5000");
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  	res.header('Access-Control-Allow-Credentials', 'true');
	next();
};



//save file log
var accessLogStream = fs.createWriteStream(__dirname + '/../log/access.log', {flags: 'a'});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));



app.listen(5000);

app.use(allowCors);

//Acionando o Json com BodyParse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));