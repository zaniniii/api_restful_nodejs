const auth = require('../../config/auth')
const uploadPicture = require('../../libs/uploadPictureCloud')
const hash = require('../../libs/hash')

module.exports = (app) => {
  const userController = app.controllers.users.userController

  app.route('/:lng/users')

    .post(async (req, res) => {
      let { name, email, avatar, facebookId, password, lat, lng } = req.body

      if (!name || !email || !password) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('field_required')
        })
        return false
      }

      let loc = [lat || 0, lng || 0]
      let pwd = await hash.encrypt(password)

      let user = {
        'name': name,
        'email': email,
        'avatar': avatar,
        'facebookId': facebookId,
        'password': pwd,
        'loc': loc
      }

      if (avatar) {
        let urlPicture = await uploadPicture(avatar)
        user.avatar = urlPicture
      }

      try {
        let result = await userController.create(user)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .put(auth, async (req, res) => {
      let { _id, name, email, avatar, facebookId, lat, lng } = req.body

      if (!name || !email) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('field_required')
        })
        return false
      }

      let loc = [lat || 0, lng || 0]

      let user = {
        '_id': _id,
        'name': name,
        'email': email,
        'avatar': avatar,
        'facebookId': facebookId,
        'loc': loc
      }

      if (avatar) {
        let urlPicture = await uploadPicture(avatar)
        user.avatar = urlPicture
      }

      try {
        let result = await userController.update(user)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    .delete(auth, async (req, res) => {
      let { id } = req.body
      if (!id) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('field_required')
        })
        return false
      }

      try {
        let result = await userController.delete(id, req.decoded.user_id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/users/:id')
    .get(auth, async (req, res) => {
      let { id } = req.params
      try {
        let result = await userController.show(id)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

    app.route('/:lng/users/update_password')
    .put(auth, async (req, res) => {
      
      let id = req.decoded.user_id

      let {
        senhaAtual,
        novaSenha
      } = req.body

      if (!id || !senhaAtual || !novaSenha) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('field_required')
        })
        return
      }

      let newPwd = await hash.encrypt(novaSenha)
    
      try {
        let result = await userController.edit_password(id, senhaAtual, newPwd)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}