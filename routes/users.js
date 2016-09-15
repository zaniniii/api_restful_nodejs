var express = require('express'),
    router = express.Router(),
    auth = require('../config/auth'),
    base64 = require('node-base64-image'),
    fs = require('fs'),
    url = require('url');

//importo o controller Users
const userController = require('../controller/userController');

//Gerar nome_imagem
 var genarate_name = function(){
    var id = "";
    while (id.length < 8) {
        id += Math.floor(Math.random() * 100);
    }
    return id;
}

//Monto a URL para salvar o caminho completo
function getUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}

//Listando Usuarios
router.get('/', auth, function(req, res){

  var profile = req.tokenProfile;
  if(profile == 'Lojista'){
    return res.status(422).json({error: true, msg:  'Você não tem permissão para acessar esta área.'});
  }

	userController.list(function(resp){

    console.log(resp);
    
		res.json(resp);
	})

});

//Adicionar Usuario
router.post('/', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var profile = req.body.profile;
	var password = req.body.password;
  var cell_phone = req.body.cell_phone;

	var user = {
		'name' : name,
		'email': email,
		'profile': profile,
		'password': password,
    'cell_phone': cell_phone,
	}

	userController.save(user, function(resp){
		res.json(resp);
	});

});


//Editar Usuario
router.put('/', auth, function(req, res){

  // Dados pessoais
	var id = req.body._id;
	var name = req.body.name;
	var email = req.body.email;
	var cell_phone = req.body.cell_phone;

	var user = {
		'id' : id,
		'name' : name,
		'email': email,
		'cell_phone': cell_phone,
		'updated_at' : new Date()
	}

	userController.update(user, function(resp){
		res.json(resp);
	});

});

//Info Usuario
router.get('/:id', auth, function(req, res){

	var id = req.params.id;

	userController.user(id, function(resp){
		res.json(resp);
	});

});

// //Deletar Usuario
router.delete('/:id', auth, function(req, res){

	var id = req.params.id;

	userController.delete(id, function(resp){
		res.json(resp);
	});
});


//Custom Avatar
router.put('/custom_avatar', auth, function(req, res){

	var id = req.body.id;
	var avatar = req.body.avatar;

	if(!id){
		return res.status(422).json({error: true, msg:  'Informe o ID do usuário.'});
	}

	//Caso não exista uma pasta do usuário crio uma nova com seu ID.
	var dir = 'public/upload/users/' + id ;
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);

	}

  var name_foto = 'avatar_' + genarate_name();

	var base64Data  = avatar.replace(/^data:image\/png;base64,/, "");
	base64Data  +=  base64Data.replace('+', ' ');
	var options = {filename: dir + '/' + name_foto};
	var imageData = new Buffer(base64Data, 'base64');


	base64.base64decoder(imageData, options, function (err, saved) {
	    if(err){
				return res.status(400).json({error: true, msg:  'Não foi possível salvar seu avatar.'});
			}
			//return res.status(200).json({success:true, msg:  'Sua capa foi salva.'});

			var user = {
				"id" : id,
				"avatar" : getUrl(req) + '/upload/users/'+ id +'/' + name_foto +'.jpg'
			}

			userController.update(user, function(resp){
				return res.status(200).json({success: true, avatar:  user.avatar});
	 	 		//res.json(resp);
	 	 });

	});
});


//Upadate password
router.put('/edit_password', auth, function(req, res){

	var id = req.body.user_id;
	var senha_atual = req.body.senha_atual;
	var nova_senha = req.body.nova_senha;

	userController.edit_password(id, senha_atual, nova_senha, function(resp){
		res.json(resp);
	});
});

module.exports = router;
