const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
// const User = require('../models/User')

// can use async/await
const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { userId, name } = decoded
    // an alternative
    // req.user = await User.findById(userId).select('-password')
    req.user = req.user = { userId, name }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = authenticationMiddleware
