
/*
 * This is user model using monogodb schema
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
     username: String,
     password: String
 });

var User = mongoose.model('user', UserSchema);

module.exports = User;
