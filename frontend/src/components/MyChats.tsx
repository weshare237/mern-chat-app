import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const MyChats = () => {
  const { user, setSelectedChat, chats, setChats, selectedChat } = ChatState()
  const [loggedUser, setLoggedUser] = useState<User | null>(null)
  const toast = useToast()

  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/v1/chats', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      setChats(data)
      console.log(chats)
    } catch (error) {
      toast({
        title: 'Error occured!',
        description: 'Failed to load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
    }
  }

  useEffect(() => {
    const storage: string | null = localStorage.getItem('userInfo')

    if (typeof storage === 'string') {
      const userInfo: User = JSON.parse(storage)
      setLoggedUser(userInfo)
    }
    fetchChats()
  }, [])

  return <div>MyChats</div>
}

export default MyChats
