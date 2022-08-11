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

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isHidden, setIsHidden] = useState<boolean>(true)

  const postDetails = (pic: File): void => {}

  const handleSubmit = () => {}

  return (
    <VStack spacing='5px'>
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

      <Button colorScheme='whatsapp' w='100%' mt={15} onClick={handleSubmit}>
        Login
      </Button>
      <Button
        variant='solid'
        colorScheme='linkedin'
        w='100%'
        mt={15}
        onClick={() => {
          setEmail('guest@demfkd.com')
          setPassword('123456')
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
