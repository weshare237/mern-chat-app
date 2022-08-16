import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react'

interface Props {
  user: IUser
  handleFunction: any
}

const UserListItem: React.FC<Props> = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#e8e8e8'
      _hover={{ background: '#38b2ac', color: 'white' }}
      w='100%'
      display='flex'
      alignItems='center'
      color='black'
      px={3}
      py={2}
      mb={2}
      borderRadius='lg'
    >
      <Avatar
        mr={2}
        size='sm'
        cursor='pointer'
        name={user.name}
        src={user.picture}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>
          <strong>Email: </strong>
          {user.email}
        </Text>
      </Box>
    </Box>
  )
}

export default UserListItem
