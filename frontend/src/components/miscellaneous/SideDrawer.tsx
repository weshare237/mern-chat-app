import {
  Search2Icon,
  BellIcon,
  ChevronDownIcon,
  UnlockIcon,
} from '@chakra-ui/icons'

import { FaUserGraduate } from 'react-icons/fa'
import { RiUserSearchFill } from 'react-icons/ri'
import { MdCastForEducation, MdOutlineOfflineShare } from 'react-icons/md'

import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Icon,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
  IconButton,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { ChatState } from '../../context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'

const SideDrawer: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [searchResult, setSearchResult] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(false)
  const { user, setSelectedChat, chats, setChats } = ChatState()
  const navigate = useNavigate()
  const toast = useToast()

  // drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

  // search
  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please enter something in search',
        status: 'info',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      })
      return
    }

    try {
      setIsLoading(true)

      const { data } = await axios.get(`/api/v1/users?search=${search}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      setIsLoading(false)
      setSearchResult(data)
    } catch (error: any) {
      toast({
        title: 'Error occured!',
        description: 'Failed to load the search results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
      setIsLoading(false)
      return
    }
  }

  // create chat
  const accessChat = async (userId: string) => {
    try {
      setIsLoadingChat(true)

      const { data } = await axios.post(
        '/api/v1/chats',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      if (chats) {
        if (!chats.find((c) => c._id === data._id)) setChats([...chats, data])
      }
      setSelectedChat(data)
      setIsLoadingChat(false)
      onClose()
    } catch (error: any) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      })
      return
    }
  }

  const logoutHandler = (): void => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  return (
    <React.Fragment>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
      >
        <Tooltip label='Search users to chat' hasArrow placement='bottom-end'>
          <Button
            variant='ghost'
            ref={btnRef}
            colorScheme='teal'
            onClick={onOpen}
          >
            <Search2Icon />
            <Text display={{ base: 'none', md: 'flex' }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize='2xl'
          fontFamily='Work sans'
          alignItems='center'
          display='flex'
          justifyContent='space-between'
        >
          <Icon as={MdCastForEducation} color='teal' mr={2} /> Weshare{' '}
          <Icon as={MdOutlineOfflineShare} ml={2} color='teal' />
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize='2xl' m={1} color='teal' />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size='sm'
                cursor='pointer'
                name={user?.user.name}
                src={user?.user.picture}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem icon={<Icon as={FaUserGraduate} />}>
                  My Profile
                </MenuItem>
              </ProfileModal>

              <MenuDivider />
              <MenuItem icon={<UnlockIcon />} onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderWidth='1px'>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display='flex' pb={2}>
              <Input
                placeholder='Type here...'
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton
                colorScheme='teal'
                aria-label='Search database'
                icon={<RiUserSearchFill />}
                onClick={handleSearch}
              />
            </Box>
            {isLoading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user: IUser) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {isLoadingChat && <Spinner ml='auto' display='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  )
}

export default SideDrawer
