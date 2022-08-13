const Chat = require('../models/Chat')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const createChat = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new BadRequestError('User id not provided')
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user.userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage')

  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name email picture',
  })

  if (isChat.length > 0) {
    res.status(StatusCodes.OK).json(isChat[0])
  } else {
    const chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [userId, req.user.userId],
    }

    const chat = await Chat.create(chatData)

    const fullChat = await Chat.findById(chat._id).populate(
      'users',
      '-password'
    )

    res.status(StatusCodes.CREATED).json(fullChat)
  }
}

const createGroup = async (req, res) => {}

const getAllChats = async (req, res) => {
  res.status(StatusCodes.OK).send()
}

const renameGroup = async (req, res) => {}

const removeFromGroup = async (req, res) => {}

const addToGroup = async (req, res) => {}

module.exports = {
  getAllChats,
  createChat,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
}
