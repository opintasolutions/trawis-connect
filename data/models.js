// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  hometown: String,
  bio: String,
  followers: [String],
  following: [String],
  points: Number,
});

// export default mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);
