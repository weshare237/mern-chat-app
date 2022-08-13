const Chat = require('../models/Chat')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

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

const createGroup = async (req, res) => {
  let { users, name } = req.body

  if (!users || !name) {
    throw new BadRequestError('Please provide users and group name')
  }

  users = JSON.parse(users)
  if (users.length < 2) {
    throw new BadRequestError(
      'More than two users are required to form a group chat'
    )
  }

  // const idsArray = users.map((user) => user.userId)

  users.push(req.user.userId)

  const chatGroupData = {
    chatName: name,
    isGroupChat: true,
    users,
    groupAdmin: req.user.userId,
  }

  const chatGroup = await Chat.create(chatGroupData)

  const fullChatGroup = await Chat.findById(chatGroup._id)
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  res.status(StatusCodes.CREATED).json(fullChatGroup)
}

const getAllChats = async (req, res) => {
  let chats = await Chat.find({
    users: { $elemMatch: { $eq: req.user.userId } },
  })
    .populate('users', '-password')
    .populate('latestMessage')
    .populate('groupAdmin', '-password')
    .sort('-updatedAt')

  chats = await User.populate(chats, {
    path: 'latestMessage.sender',
    select: 'name email picture',
  })

  res.status(StatusCodes.OK).json(chats)
}

const renameGroup = async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new BadRequestError('Group name not provided')
  }

  const group = await Chat.findOneAndUpdate(
    { _id: req.params.id },
    { chatName: name },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  if (!group) {
    throw new NotFoundError(`No chat group found with id ${req.params.id}`)
  }

  res.status(StatusCodes.OK).json(group)
}

const removeFromGroup = async (req, res) => {
  const { userId } = req.body
  const { id: groupId } = req.params

  console.log(userId, groupId)

  if (!userId) {
    throw new BadRequestError('User not provided')
  }

  const group = await Chat.findByIdAndUpdate(
    groupId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  console.log(group)

  if (!group) {
    throw new NotFoundError(`No chat group found with id ${groupId}`)
  }

  res.status(StatusCodes.OK).json(group)
}

const addToGroup = async (req, res) => {
  const { userId } = req.body
  const { id: groupId } = req.params

  if (!userId) {
    throw new BadRequestError('User not provided')
  }

  const group = await Chat.findByIdAndUpdate(
    groupId,
    {
      $push: { users: userId },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('users', '-password')
    .populate('groupAdmin', '-password')

  if (!group) {
    throw new NotFoundError(`No chat group found with id ${groupId}`)
  }

  res.status(StatusCodes.OK).json(group)
}

module.exports = {
  getAllChats,
  createChat,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
}
