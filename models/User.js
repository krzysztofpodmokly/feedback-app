const mongoose = require('mongoose');
// Before destructuring
// const Schema = mongoose.Schema;
// After destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema); // Model Class is created!









