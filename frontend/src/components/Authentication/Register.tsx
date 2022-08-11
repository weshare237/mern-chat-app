import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const Register: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [picture, setPicture] = useState<string>('')
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const postDetails = (pic: File): void => {}

  const handleSubmit = () => {}

  return (
    <VStack spacing='5px'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter Your Name'
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder='Enter Your Password'
            type={isHidden ? 'password' : 'text'}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w='4.5rem'>
            <IconButton
              h='1.75rem'
              size='sm'
              onClick={() => setIsHidden(!isHidden)}
              aria-label='Toggle password'
              icon={isHidden ? <ViewIcon /> : <ViewOffIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            placeholder='Confirm Your Password'
            type={isHidden ? 'password' : 'text'}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement w='4.5rem'>
            <IconButton
              h='1.75rem'
              size='sm'
              onClick={() => setIsHidden(!isHidden)}
              aria-label='Toggle confirm password'
              icon={isHidden ? <ViewIcon /> : <ViewOffIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='picture'>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) => {
            if (e.target.files) postDetails(e.target.files[0])
          }}
        />
      </FormControl>
      <Button colorScheme='whatsapp' w='100%' mt={15} onClick={handleSubmit}>
        Register
      </Button>
    </VStack>
  )
}

export default Register
