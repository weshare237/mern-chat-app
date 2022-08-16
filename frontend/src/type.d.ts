interface Chat {
  isGroupChat: boolean
  users: User[]
  _id: string
  chatName: string
  groupAdmin?: User
}

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
  createdAt: Date
  updatedAt: Date
  _v: number
}

interface ChatContextType {
  user: User | null
  setUser: (user: User) => void
  selectedChat: any
  setSelectedChat: (chat: any) => void
}
