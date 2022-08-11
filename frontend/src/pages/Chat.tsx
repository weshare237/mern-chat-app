import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Chat: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([])

  const getAllChats = async () => {
    try {
      const { data } = await axios.get('/api/v1/chats')
      setChats(data)
    } catch (error: any) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getAllChats()
  }, [])

  return (
    <div>
      {chats.map((chat: Chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  )
}

export default Chat
