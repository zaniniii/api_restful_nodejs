const registerLog = require('../../libs/registerLog')

module.exports = (app) => {
  const authController = app.controllers.auth.authController

  app.route('/:lng/auth')

    .post(async (req, res) => {
      let {
        email,
        password,
        deviceId
      } = req.body

      // Validate fields
      if (!email) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('email_required')
        })
        return false
      }

      if (!password) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('password_required')
        })
        return false
      }

      try {
        let result = await authController.loginNormal(email, password, deviceId)
        if (result.success) {
          registerLog(result.data._id, __('login'))
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })

  app.route('/:lng/auth/fb')
    .post(async (req, res) => {
      let facebookId = req.body.facebookId

      if (!facebookId) {
        res.status(400).json({
          error: true,
          code: 400,
          msg: __('facebook_id_required')
        })
        return false
      }

      try {
        let result = await authController.loginFB(facebookId)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
  
  app.route('/:lng/auth/remember_password')
    .post(async (req, res) => {
      let {
        email
      } = req.body
      try {
        let result = await authController.remember_password(email)
        if (result.success) {
          res.status(result.code).send(result)
        }
      } catch (error) {
        res.status(error.code).send(error)
      }
    })
}