import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login'
import Register from '../components/Authentication/Register'

const Home: React.FC = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box
        display='flex'
        justifyContent='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text fontSize='4xl' fontFamily='work sans' color='black'>
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg='white'
        w='100%'
        p={4}
        borderRadius='lg'
        color='black'
        borderWidth='1px'
      >
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList mb='1em'>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
