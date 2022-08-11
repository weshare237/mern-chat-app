const express = require('express')
const router = express.Router()

const {
  getAllMessages,
  createMessage,
  getSingleMessage,
  UpdateMessage,
  deleteMessage,
} = require('../controllers/messages')

router.route('/').get(getAllMessages).post(createMessage)
router
  .route('/:id')
  .get(getSingleMessage)
  .delete(deleteMessage)
  .patch(UpdateMessage)

module.exports = router
