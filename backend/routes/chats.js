const express = require('express')
const router = express.Router()

const {
  getAllChats,
  createChat,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require('../controllers/chats')

router.route('/').get(getAllChats).post(createChat)
router.route('/group').post(createGroup)
router.route('/rename/:id').patch(renameGroup)
router.route('/group-remove/:id').patch(removeFromGroup)
router.route('/group-add/:id').patch(addToGroup)

module.exports = router
