'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  description: {
    type: String
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date
  }
})

module.exports = mongoose.model('Log', LogSchema)