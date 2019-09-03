const bcrypt = require('bcryptjs')
const saltRounds = 8

exports.encrypt = (pwd) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pwd, saltRounds).then(function(hash) {
      resolve(hash)
    });
  })
}

exports.compare = (pwd, hash) => {
  // console.log(pwd)
  // console.log(hash)

  return new Promise((resolve, reject) => {
    bcrypt.compare(pwd, hash, (err, res) => {
      resolve(res)
    });
  })
}