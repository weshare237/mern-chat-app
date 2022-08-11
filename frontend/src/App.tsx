import React from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chats from './pages/Chats'
import { Button } from '@chakra-ui/react'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Button colorScheme='blue'>Button</Button>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='chats' element={<Chats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
