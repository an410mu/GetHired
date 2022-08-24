
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
  try {
    const user = await User.create(req.body);
    res.status(201).json({user})
  } catch (error) {
    res.status(500).json({msg: 'there is an error', err:error})
  }

},

login: (req, res) => {
  res.send('login a user')
},

update: (req, res) => {
  res.send('update a user')
}
}

