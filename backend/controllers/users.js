const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')

const getAllUsers = async (req, res) => {
  const { search } = req.query

  let queryObject = {}

  if (search) {
    queryObject = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    }
  }

  const users = await User.find(queryObject).find({
    _id: { $ne: req.user.userId },
  })

  res.status(StatusCodes.OK).json(users)
}

module.exports = {
  getAllUsers,
}
