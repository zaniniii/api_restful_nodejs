
//validando Token recebido
var model = require('../models/user');
var jwt = require('jwt-simple');
var segredo = 'za9/*-+.798585lczm798585';

module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (token) {
  try {
    var decoded = jwt.decode(token, segredo);
    //console.log('decodando ' + decoded);

    if (decoded.exp <= Date.now()) {
      res.json(400, {error: true, message: 'Acesso Expirado, faça login novamente'});
    }
    
    model.findOne({ _id: decoded.iss }, function(err, user) {
      if(err)
        res.status(500).json({error: true, message: "erro ao procurar usuario do token."})
      req.user = user;
     // console.log('achei usuario ' + req.user)
      return next();
    });
  
  } catch (err) {
    return res.status(401).json({error: true, message:  'Erro: Seu token é inválido'});
  }
} else {
  res.json(401, {error: true, message:  'Token não encontrado ou informado'})
}
};