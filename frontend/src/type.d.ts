interface User {
  user: {
    name: string
    picture: string
    email: string
  }
  token: string
}

interface IUser {
  _id: string
  name: string
  email: string
  password: string
  picture?: string
  isAdmin?: string
}

interface ChatContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  selectedChat: Chat | null
  setSelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>
  chats: Chat[]
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>
}

interface Chat {
  _id: string
  chatName: string
  isChatGroup: boolean
  users: string[] | IUser[]
  groupAdmin?: string | IUser
}
