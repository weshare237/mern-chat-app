const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, picture: user.picture, email: user.email },
    token,
  })
}

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, picture: user.picture, email: user.email },
    token,
  })
}

module.exports = {
  login,
  register,
}
