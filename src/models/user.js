const mongoose = require('../config/db')
const Schema = mongoose.Schema

const UserSchema = Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: [/\S+@\S+\.\S/, __('email_invalid')]
  },

  avatar: {
    type: String
  },

  active: {
    type: Boolean,
    default: true
  },

  profile: {
    type: String,
    default: 'User'
  },

  facebookId: {
    type: String
  },

  password: {
    type: String
  },

  token: {
    type: String
  },

  loc: {
    type: [Number], // [<longitude>, <latitude>]
    index: '2d' // create the geospatial index
  },

  createdAt: {
    type: Date,
    default: Date.now,
    timezone: 'America/Sao_Paulo'
  },

  updatedAt: {
    type: Date,
    timezone: 'America/Sao_Paulo'
  }

})

UserSchema.set('toJSON', { hide: 'password' })

module.exports = mongoose.model('User', UserSchema)