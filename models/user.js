'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = Schema({

		name : {
			type : String,
			required : true,
			index : true
		},

		email : {
			type : String,
			unique: true,
		    required: true,
		    validate: [ /\S+@\S+\.\S/, 'Email inválido' ]
		},

		profile : {
			type : String,
			required : true,
			index : true
		},

		avatar : {
			type : String
		},

		cell_phone : {
			type : String
		},

		password : {
			type : String,
			required : true
		},

		token: {
	        type: String,
	        //unique: true,
	        //required: true
    	},

		created_at :{
			type: Date,
        	default: Date.now
		},

		updated_at :{
			type: Date,
		}

	});


//Run before saving user
UserSchema.pre('save', function(callback) {

  var user = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});


UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', UserSchema);
