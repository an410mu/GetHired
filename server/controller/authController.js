
//const pool = require('../db/index.js');


module.exports = {
register: (req, res) => {
  //This is from postgressql
  // const userInput = [req.body.name, req.body.email, req.body.password]
  // console.log("this is data from postman", userInput);
  // let qStr = `INSERT INTO users( name, email, password)
  // VALUES ( $1, $2, $3)`;
  // pool.query(qStr, userInput);
  res.send('register a user')
},

login: (req, res) => {
  res.send('login a user')
},

update: (req, res) => {
  res.send('update a user')
}
}

