const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    minlength:3,
    maxlength: 20,
    trim:true
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 6
  },
})

//hash the password before save to database
userSchema.pre('save', async function() {
  //console.log(this.password)
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})
let User = mongoose.model('User', userSchema)


module.exports = User;