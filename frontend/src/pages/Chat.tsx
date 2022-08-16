import { Box } from '@chakra-ui/react'
import ChatBox from '../components/ChatBox'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import { ChatState } from '../context/ChatProvider'

const Chat: React.FC = () => {
  const user: User | null = ChatState()?.user || null

  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        h='91.5vh'
        p='10px'
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default Chat
