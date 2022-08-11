const express = require('express')
const router = express.Router()

const { getAllChats, getSingleChat } = require('../controllers/chats')

router.route('/').get(getAllChats)
router.route('/:id').get(getSingleChat)

module.exports = router
