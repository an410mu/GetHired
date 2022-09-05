
//const pool = require('../db/index.js');
const User = require('../db/mongo');

module.exports = {
register: async (req, res) => {

  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    throw Error('Please enter all fields');
  }

  const existedUser = await User.findOne({email})
  if (existedUser) {
    throw Error('email is already registed')
  }

  //select in the schema not working with the create, the password still get pass back
  const user = await User.create({name, email, password});
  const token = user.createJWT()
  res.status(201).json({user:{
    email:user.email,
    name:user.name
  }, token})


},

//check password for registed user
login: async (req, res) => {
  const {email, password} = req.body;
    if (!email || !password) {
      throw Error('Please enter all values')
    }

    const user = await User.findOne({email}).select('+password')
    console.log('this is user', user)
    if (!user) {
      throw new Error('User does not exist')
    }

    const checkPwd = await user.comparePassword(password)
    if (!checkPwd) {
      throw new Error ('Invalid password')
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(200).json({ user, token})
},

update: (req, res) => {
  res.send('update a user')
}
}

