const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const hash = require('../../libs/hash')

// Create user
exports.create = (user) => {
  return new Promise((resolve, reject) => {
    new User(user).save((err, user) => {
      if (err) {
        if (err.code === 11000) {
          let e = {
            error: true,
            code: 400,
            msg: __('this_email_exists')
          }
          return reject(e)
        }
        let e = {
          error: true,
          code: 400,
          msg: __('fail_create_new_cliente')
        }
        return reject(e)
      }

      let token = jwt.sign({
        'user_id': user._id,
        'user_profile': user.profile
      }, process.env.JWT_SECRET, {})

      user.token = token

      let result = {
        success: true,
        code: 200,
        msg: __('add_cliente_success'),
        data: user
      }
      return resolve(result)
    })
  })
}

// Show User
exports.show = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) {
        let e = {
          error: true,
          code: 400,
          msg: __('fail_show_user')
        }
        reject(e)
        return false
      }

      if (!user) {
        let e = {
          error: true,
          code: 400,
          msg: __('user_not_found')
        }
        reject(e)
        return false
      }

      let result = {
        success: true,
        code: 200,
        data: user
      }
      resolve(result)
    })
  })
}

// Update
exports.update = (editClient) => {
  return new Promise((resolve, reject) => {
    User.findById(editClient._id, (err, user) => {
      if (err) {
        let e = {
          error: true,
          code: 400,
          msg: __('fail_update_user')
        }
        reject(e)
        return false
      }

      if (!user) {
        let e = {
          error: true,
          code: 400,
          msg: __('usernot_found')
        }
        reject(e)
        return false
      }

      if (editClient.name) {
        user.name = editClient.name
      }

      if (editClient.email) {
        user.email = editClient.email
      }

      if (editClient.avatar) {
        user.avatar = editClient.avatar
      }

      if (editClient.facebook_id) {
        user.facebook_id = editClient.facebook_id
      }

      if (editClient.loc) {
        user.loc = editClient.loc
      }

      user.updated_at = new Date()

      user.save((erro, user) => {
        if (err) {
          let e = {
            error: true,
            code: 400,
            msg: __('fail_update_user')
          }
          reject(e)
          return false
        }

        let result = {
          success: true,
          code: 200,
          msg: __('updated_user_success'),
          data: user
        }
        resolve(result)
      })
    })
  })
}

// Remove user
exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (erro, user) => {
      if (!user) {
        let e = {
          error: true,
          code: 400,
          msg: __('user_not_found')
        }
        reject(e)
        return false
      }

      if (erro) {
        let e = {
          error: true,
          code: 400,
          msg: __('fail_remove_user')
        }
        reject(e)
        return false
      }

      user.remove((erro) => {
        let result = {
          success: true,
          code: 200,
          msg: __('removed_user_success')
        }
        resolve(result)
      })
    })
  })
}

// Edit password
exports.edit_password = (userLogged, senhaAtual, novaSenha) => {
  return new Promise((resolve, reject) => {
    User.findById(userLogged, async (erro, user) => {
      if (!user) {
        let e = {
          error: true,
          code: 400,
          msg: __('user_not_found')
        }
        reject(e)
        return false
      }
      let comparePassword = await hash.compare(senhaAtual, user.password)

      if (!comparePassword) {
        let e = {
          error: true,
          code: 401,
          msg: __('current_invalid_password')
        }
        reject(e)
        return false
      }

        user.password  = novaSenha

        user.save((error, res) => {
          if (error) {
            let e = {
              error: true,
              code: 400,
              msg: __('fail_update_password')
            }
            reject(e)
            return false
          } else {
            let result = {
              success: true,
              code: 200,
              msg: __('your_password_has_been_changed_successfully')
            }
            resolve(result)
          }
        })
    })
  })
}