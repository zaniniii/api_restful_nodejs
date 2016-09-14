var config = require('./config'),
    model = require('../models/user'),
    jwt = require('jwt-simple');

module.exports = function(req, res, next) {

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
    try {
      var decoded = jwt.decode(token, config.jwtToken);

      //console.log('decodando ' + decoded);
      // if (decoded.exp <= Date.now()) {
      //   return res.status(400).json({error: true, msg:  'Acesso Expirado, faça login novamente'});
      // }

      model.findById({ _id: decoded.user_id}, function(err, user) {

        if(err){
          return res.status(500).json({error: true, msg: "Erro ao procurar usuario do token."})
        }
          req.user = user;
          req.tokenProfile = decoded.user_profile;
          return next();
        });

      } catch (err) {
        return res.status(401).json({error: true, msg:  'Erro: Seu token está inválido'});
      }
    } else {
      return res.status(401).json({error: true, msg:  'Token não encontrado ou informado'});
    }
}
