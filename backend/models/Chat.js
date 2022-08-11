const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: [true, 'Please provide chat name'],
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Chat', ChatSchema)
