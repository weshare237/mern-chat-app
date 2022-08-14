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
  }
  token: string
}

interface ChatContextType {
  user: User | null
  setUser: (user: User) => void
}
