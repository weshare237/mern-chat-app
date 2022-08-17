import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const ChatContext = createContext({} as ChatContextType)

export const ChatState = () => {
  return useContext(ChatContext)
}

const ChatProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storage: string | null = localStorage.getItem('userInfo')

    if (typeof storage === 'string') {
      const userInfo: User = JSON.parse(storage)
      setUser(userInfo)
    } else {
      navigate('/')
    }
  }, [navigate])

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
