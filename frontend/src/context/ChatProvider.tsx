import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const ChatContext = createContext<ChatContextType | null>(null)

export const ChatState = () => {
  return useContext(ChatContext)
}

const ChatProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [selectedChat, setSelectedChat] = useState<any>()
  const navigate = useNavigate()

  useEffect(() => {
    const storage: string | null = localStorage.getItem('userInfo')

    if (typeof storage === 'string') {
      const userInfo: User = JSON.parse(storage)
      setUser(userInfo)
      console.log(userInfo)
    } else {
      navigate('/')
    }
  }, [navigate])

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
