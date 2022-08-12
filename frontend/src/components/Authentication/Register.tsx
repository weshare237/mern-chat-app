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

const Register: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [picture, setPicture] = useState<string>('')
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const navigate = useNavigate()

  const postDetails = async (pic: File) => {
    setIsLoading(true)

    if (pic.type === 'image/png' || pic.type === 'image/jpeg') {
      const formData = new FormData()
      formData.append('file', pic)
      formData.append('upload_preset', 'chat-app')
      formData.append('cloud_name', 'demofkd')

      try {
        const { data } = await axios.post(
          'https://api.cloudinary.com/v1_1/demofkd/image/upload',
          formData
        )
        setPicture(data.url.toString())
        setIsLoading(false)
      } catch (error: any) {
        console.log(error.response)
        setIsLoading(false)
      }
    } else {
      toast({
        title: 'Please select an image!',
        description: 'Supported formats are png and jpg',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setIsLoading(false)
      return
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true)

    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match!',
        description: 'Password and confirm password must be same',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      setIsLoading(false)
      return
    }

    try {
      const { data } = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        picture,
      })

      toast({
        title: 'Registration successfull!',
        description: 'You are good to go',
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
      <Button
        colorScheme='whatsapp'
        w='100%'
        mt={15}
        onClick={handleSubmit}
        isLoading={isLoading}
        loadingText='Please wait for a moment...'
      >
        Register
      </Button>
    </VStack>
  )
}

export default Register
