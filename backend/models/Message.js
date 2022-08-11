const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    chat: {
      type: mongoose.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', MessageSchema)
