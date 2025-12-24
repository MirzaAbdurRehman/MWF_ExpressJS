

const mongoose = require('mongoose');
const bcryt = require('bcryptjs');


const userSchema =  new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = await bcryt.hash(this.password, 10)  // salt value 0 to 10
    next();
})


module.exports =  mongoose.model('UserSchema', userSchema);