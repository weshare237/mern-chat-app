const data = require('../data/data')
const { StatusCodes } = require('http-status-codes')

const getAllChats = async (req, res) => {
  res.status(StatusCodes.OK).json(data)
}

const getSingleChat = async (req, res) => {
  const { id: chatId } = req.params
  const chat = data.find((c) => c._id === chatId)
  res.status(StatusCodes.OK).json(chat)
}

module.exports = {
  getAllChats,
  getSingleChat,
}
