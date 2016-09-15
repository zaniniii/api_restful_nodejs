var express = require('express');
var router = express.Router();

//importo o controller Login
const loginController = require('../controller/loginController.js');

//Logar
router.post('/', function(req, res){

	var email = req.body.email;
	var password = req.body.password;
	var device_id = req.body.device_id;

	loginController.logar(email, password, device_id, function(resp){
		res.json(resp);
	});
});

//Lembrar Senha
router.post('/remember_password', function(req, res){

	var email = req.body.email;

	console.log(email);
	loginController.remember_password(email, function(resp){
		res.json(resp);
	});

});

module.exports = router;
