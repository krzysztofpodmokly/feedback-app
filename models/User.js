const mongoose = require('mongoose');
// Before destructuring
// const Schema = mongoose.Schema;
// After destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    credits: {
        type: Number,
        default: 0
    } 
});

mongoose.model('users', userSchema); // Model Class is created!









