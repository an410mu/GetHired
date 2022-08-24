
//const pool = require('../db/index.js');
const User = require('../db/mongo');

module.exports = {
register: async (req, res) => {
  //This is from postgressql
  // const userInput = [req.body.name, req.body.email, req.body.password]
  // console.log("this is data from postman", userInput);
  // let qStr = `INSERT INTO users( name, email, password)
  // VALUES ( $1, $2, $3)`;
  // pool.query(qStr, userInput);
  // console.log("this is the body", req.body)

  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    res.json('please enter all values')
  }

  const user = await User.create({name, email, password});
  const token = user.createJWT()
  res.status(201).json({user, token})


},

login: (req, res) => {
  res.send('login a user')
},

update: (req, res) => {
  res.send('update a user')
}
}

