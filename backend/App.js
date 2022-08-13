require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// db connection
const connectDB = require('./db/connect')

// routes
const chatsRouter = require('./routes/chats')
const authRouter = require('./routes/auth')
const messagesRouter = require('./routes/messages')
const usersRouter = require('./routes/users')

// middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')

// extra security
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.use('/api/v1/chats', authMiddleware, chatsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/messages', messagesRouter)
app.use('/api/v1/users', authMiddleware, usersRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
