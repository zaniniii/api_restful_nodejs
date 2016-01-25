
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

//Salvando log
var accessLogStream = fs.createWriteStream(__dirname + '/../log/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

var port = process.env.PORT || 8080;

app.listen(port);
app.use(allowCors);

//Acionando o Json com BodyParse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

