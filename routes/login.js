var express = require('express');
var router = express.Router();
var validator = require('validator');

//importo o controller Login
var loginController = require('../controller/loginController.js');

//Logar
router.post('/', function(req, res){

	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));


	loginController.logar(email, password, function(resp){
		res.json(resp);
	});
});


module.exports = router;