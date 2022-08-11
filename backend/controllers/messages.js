const getAllMessages = async (req, res) => {
  res.send('get all messages')
}
const getSingleMessage = async (req, res) => {
  res.send('get single message')
}
const createMessage = async (req, res) => {
  res.send('create message')
}
const UpdateMessage = async (req, res) => {
  res.send('update message')
}

const deleteMessage = async (req, res) => {
  res.send('delete message')
}

module.exports = {
  getAllMessages,
  getSingleMessage,
  createMessage,
  UpdateMessage,
  deleteMessage,
}
