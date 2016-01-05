var express = require('express');
var router = express.Router();
var validator = require('validator');

//importo o controller Users
var userController = require('../controller/userController.js');

//Listando Usuarios
router.get('/', function(req, res){

	userController.list(function(resp){
		res.json(resp);
	})});

//Adicionar Usuario
router.post('/', function(req, res){

	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));


	var user = {

		'fullname' : fullname,
		'email': email,
		'password': password,
		'created_at' : new Date()
	}

	userController.save(user, function(resp){
		res.json(resp);
	});});

//Editar Usuario
router.put('/', function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));
	var fullname = validator.trim(validator.escape(req.param('fullname')));
	var email = validator.trim(validator.escape(req.param('email')));
	var password = validator.trim(validator.escape(req.param('password')));

	var editUser = {
		'fullname' : fullname,
		'email': email,
		'password': password
	}

	userController.update(id, editUser, function(resp){
		res.json(resp);
	});});

//Info Usuario
router.get('/:id', function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));

	userController.user(id, function(resp){
		res.json(resp);
	});});

// //Deletar Usuario
router.delete('/:id', function(req, res){

	var id = validator.trim(validator.escape(req.param('id')));

	userController.delete(id, function(resp){
		res.json(resp);
	});});

module.exports = router;