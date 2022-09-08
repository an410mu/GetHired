const jwt  = require( 'jsonwebtoken');

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader ) {
    throw Error('Unauthorized')
  }
  const token = authHeader.split(' ')[1]
  try {
    const playload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: playload.userID }
    //console.log(req.user)
    next()
  } catch (error) {
    throw Error('Unauthorized')
  }
}

module.exports = authUser;