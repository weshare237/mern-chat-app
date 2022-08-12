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
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true)

    if (!email || !password) {
      toast({
        title: 'Please provide all informations!',
        description: 'All fields are required',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setIsLoading(false)
      return
    }

    try {
      const { data } = await axios.post('/api/v1/auth/login', {
        email,
        password,
      })
      toast({
        title: 'Login successfull!',
        description: 'Welcome ' + data.user.name,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      setIsLoading(false)
      navigate('/chats')
    } catch (error: any) {
      toast({
        title: 'Error occured!',
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setIsLoading(false)
    }
  }

  return (
    <VStack spacing='5px'>
      <FormControl id='email-log' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id='password-log' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder='Enter Your Password'
            type={isHidden ? 'password' : 'text'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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

      <Button
        isLoading={isLoading}
        loadingText='Please wait for a moment...'
        colorScheme='whatsapp'
        w='100%'
        mt={15}
        onClick={handleSubmit}
      >
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
