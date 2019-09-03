'use strict'
// Model user
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const hash = require('../../libs/hash')
const sendMail = require('../../libs/sendMail')

// Genarate new password
const generatePassword = () => {
  let id = ''
  while (id.length < 5) {
    id += Math.floor(Math.random() * 100)
  }
  return id
}

// Login normal
exports.loginNormal = (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      email
    }, async (erro, user) => {
      if (!user) {
        let e = {
          error: true,
          code: 400,
          msg: __('user_not_found')
        }
        reject(e)
        return false
      } else {
        let comparePassword = await hash.compare(password, user.password)

        if (!comparePassword) {
          let e = {
            error: true,
            code: 401,
            msg: __('login_invalid')
          }
          reject(e)
          return false
        }

        let token = jwt.sign({
          'user_id': user._id,
          'user_profile': user.profile
        }, process.env.JWT_SECRET)

        user.token = token
        user.password = undefined

        let result = {
          success: true,
          code: 200,
          data: user
        }
        resolve(result)
      }
    })
  })
}

// Login with facebook
exports.loginFB = (facebookId) => {
  return new Promise((resolve, reject) => {
    User.findOne({ 'facebookId': facebookId }, (error, user) => {
      if (error) {
        let e = {
          error: true,
          code: 400,
          msg: error
        }
        reject(e)
        return false
      }

      if (!user) {
        let e = {
          error: true,
          code: 401,
          msg: __('user_not_found')
        }
        reject(e)
        return false
      } else {
        let token = jwt.sign({
          'user_id': user._id,
          'user_profile': user.profile
        }, process.env.JWT_SECRET)

        user.token = token
        user.password = undefined

        let result = {
          success: true,
          code: 200,
          data: user
        }
        resolve(result)
      }
    })
  })
}

// Remember password
exports.remember_password = (email) => {
  return new Promise(async (resolve, reject) => {

    let newPassword = generatePassword()
    let pwd = await hash.encrypt(newPassword)

  
    User.findOneAndUpdate({
      email
    }, {password: pwd, updatedAt: new Date()}, async (erro, user) => {
      if (!user) {
        let e = {
          error: true,
          code: 400,
          msg: __('user_not_found')
        }
        reject(e)
        return false
      }

      sendMail('remember_password', {
        name: user.name,
        new_password: newPassword
      }, user.email)

      let result = {
        code: 200,
        success: true,
        msg: __('send_email_remember_password')
      }

      resolve(result)

    })
  })
}