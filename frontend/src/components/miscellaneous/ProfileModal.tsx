import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'
import { EmailIcon, ViewIcon } from '@chakra-ui/icons'

interface Props {
  user: User | null
  children: React.ReactNode
}

const ProfileModal = ({ user, children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          aria-label='View profile'
          onClick={onOpen}
        ></IconButton>
      )}

      <Modal size='lg' isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontSize='40px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
          >
            {user?.user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={user?.user.picture}
              alt={user?.user.name}
            />
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              fontFamily='Work sans'
            >
              <IconButton
                colorScheme='teal'
                aria-label='Call Segun'
                size='lg'
                icon={<EmailIcon />}
              />{' '}
              {user?.user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
