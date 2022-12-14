'use strict';

/**
 * Module dependencies.
 */
const { createHmac, verify } = require('node:crypto');
const mongoose = require('mongoose');
const { has } = require('browser-sync');
const bcrypt = require('bcryptjs');
const passportLocalMongoose = require('passport-local-mongoose');
const { JsonWebTokenError, sign:jwtsign } = require('jsonwebtoken');
const env = require('dotenv').config();
const Schema = mongoose.Schema;
/**
 * User Schema
 */

const UserSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
    unique: true,
  },
  password: {
    type: String,
    default: '',
  },
  refreshtoken:{
    type: String,
    unique: true
  }
});

UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

/**
 * Methods
 */
UserSchema.methods = {
  createToken() {
    return jwtsign(
      {
        username: this.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        algorithm: process.env.JWT_ALGORITHM,
      }
    );
  },

  authJson() {
    return {
      _id: this._id,
      username: this.username,
      token: this.createToken(),
    };
  },

  testEnv() {
    console.log(process.env.JWT_SECRET);
  },
};

UserSchema.methods.matchPassword = function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const userModel = mongoose.model('User', UserSchema);

module.exports = { userModel };
